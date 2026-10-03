import type {
  FlatFormValues,
  PropertyWizardValues,
  RoomFormValues,
} from "@/validation";

export const createEmptyRoom = (): RoomFormValues => ({
  name: "",
  rent: "",
  description: "",
});

export const createEmptyFlat = (): FlatFormValues => ({
  name: "",
  floor: "",
  rent: "",
  description: "",
  rooms: [],
});

export const createDefaultValues = (): PropertyWizardValues => ({
  property: { title: "", address: "", city: "", description: "" },
  flats: [createEmptyFlat()],
});
