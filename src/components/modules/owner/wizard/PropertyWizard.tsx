"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { type FormEvent, useRef, useState } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  PROPERTY_KEYS,
  useCreateFlat,
  useCreateProperty,
  useCreateRoom,
} from "@/hooks";
import { getErrorMessage } from "@/utils";
import { type PropertyWizardValues, propertyWizardSchema } from "@/validation";
import { createDefaultValues } from "./defaults";
import FlatsStep from "./FlatsStep";
import PropertyStep from "./PropertyStep";
import ReviewStep from "./ReviewStep";
import SubmissionResult from "./SubmissionResult";
import WizardSteps from "./WizardSteps";

const STEPS = ["Property", "Flats & rooms", "Review"] as const;

const STEP_COPY = [
  {
    title: "Property details",
    description: "Tell us about the building or house you are listing.",
  },
  {
    title: "Flats and rooms",
    description:
      "Add each flat you rent out. Rooms are optional and let tenants rent a single room.",
  },
  {
    title: "Review and submit",
    description:
      "Check everything before you submit. An admin reviews new properties before they go public.",
  },
];

interface Progress {
  propertyId?: string;
  flatIds: Record<number, string>;
  rooms: Set<string>;
}

const freshProgress = (): Progress => ({ flatIds: {}, rooms: new Set() });

export default function PropertyWizard() {
  const queryClient = useQueryClient();
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState<
    "editing" | "submitting" | "failed" | "done"
  >("editing");
  const [created, setCreated] = useState(0);
  const [total, setTotal] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const progress = useRef<Progress>(freshProgress());
  const frozen = useRef<PropertyWizardValues | null>(null);

  const form = useForm<PropertyWizardValues>({
    resolver: zodResolver(propertyWizardSchema),
    defaultValues: createDefaultValues(),
    mode: "onTouched",
  });
  const flats = useWatch({ control: form.control, name: "flats" });

  const { mutateAsync: createProperty } = useCreateProperty();
  const { mutateAsync: createFlat } = useCreateFlat();
  const { mutateAsync: createRoom } = useCreateRoom();

  const run = async (values: PropertyWizardValues) => {
    frozen.current = values;
    setTotal(
      1 +
        values.flats.length +
        values.flats.reduce((sum, flat) => sum + flat.rooms.length, 0),
    );
    setPhase("submitting");

    const state = progress.current;
    try {
      let propertyId = state.propertyId;
      if (!propertyId) {
        const res = await createProperty(values.property);
        propertyId = res.data.id;
        state.propertyId = propertyId;
        setCreated((n) => n + 1);
      }

      for (const [flatIndex, flat] of values.flats.entries()) {
        let flatId = state.flatIds[flatIndex];
        if (!flatId) {
          const res = await createFlat({
            propertyId,
            name: flat.name,
            floor: Number(flat.floor),
            rent: Number(flat.rent),
            description: flat.description,
          });
          flatId = res.data.id;
          state.flatIds[flatIndex] = flatId;
          setCreated((n) => n + 1);
        }

        for (const [roomIndex, room] of flat.rooms.entries()) {
          const key = `${flatIndex}-${roomIndex}`;
          if (state.rooms.has(key)) continue;
          await createRoom({
            flatId,
            name: room.name,
            rent: Number(room.rent),
            description: room.description,
          });
          state.rooms.add(key);
          setCreated((n) => n + 1);
        }
      }

      await queryClient.invalidateQueries({ queryKey: PROPERTY_KEYS.mine });
      toast.success("Property submitted for review");
      setPhase("done");
    } catch (error) {
      const message = getErrorMessage(error);
      setErrorMessage(message);
      toast.error(message);
      setPhase("failed");
    }
  };

  const retry = () => {
    if (frozen.current) void run(frozen.current);
  };

  const startOver = () => {
    progress.current = freshProgress();
    frozen.current = null;
    form.reset(createDefaultValues());
    setStep(0);
    setCreated(0);
    setTotal(0);
    setErrorMessage("");
    setPhase("editing");
  };

  const goNext = async () => {
    const valid =
      step === 0 ? await form.trigger("property") : await form.trigger("flats");
    if (valid) setStep((current) => current + 1);
  };

  const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (step < STEPS.length - 1) {
      void goNext();
      return;
    }
    void form.handleSubmit(run)(event);
  };

  if (phase !== "editing") {
    return (
      <SubmissionResult
        phase={phase}
        created={created}
        total={total}
        errorMessage={errorMessage}
        onRetry={retry}
        onStartOver={startOver}
      />
    );
  }

  const isLast = step === STEPS.length - 1;

  return (
    <div className="space-y-8">
      <WizardSteps steps={STEPS} current={step} />

      <FormProvider {...form}>
        <form onSubmit={onFormSubmit} noValidate className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold">{STEP_COPY[step].title}</h2>
            <p className="text-sm text-muted-foreground">
              {STEP_COPY[step].description}
            </p>
          </div>

          {step === 0 && <PropertyStep />}
          {step === 1 && <FlatsStep />}
          {step === 2 && <ReviewStep />}

          <div className="flex items-center justify-between gap-3 border-t pt-6">
            <Button
              type="button"
              variant="outline"
              disabled={step === 0}
              onClick={() => setStep((current) => current - 1)}
            >
              <ArrowLeft className="size-4" />
              Back
            </Button>

            {isLast ? (
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && (
                  <Loader2 className="size-4 animate-spin" />
                )}
                Submit for review
              </Button>
            ) : (
              <Button
                type="button"
                disabled={step === 1 && flats.length === 0}
                onClick={goNext}
              >
                Next
                <ArrowRight className="size-4" />
              </Button>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
