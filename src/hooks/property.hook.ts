import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createProperty,
  deleteProperty,
  getAllProperties,
  getAllPropertiesForAdmin,
  getMyProperties,
  updateProperty,
  updatePropertyStatus,
} from "@/api";
import type {
  IPropertyQuery,
  IUpdatePropertyPayload,
  PropertyStatusUpdate,
} from "@/types";

export const PROPERTY_KEYS = {
  mine: ["properties", "mine"] as const,
  all: ["properties", "all"] as const,
};

export function useMyProperties() {
  return useQuery({
    queryKey: PROPERTY_KEYS.mine,
    queryFn: getMyProperties,
  });
}

export function useProperties(query: IPropertyQuery = {}) {
  return useQuery({
    queryKey: [...PROPERTY_KEYS.all, query],
    queryFn: () => getAllProperties(query),
  });
}

export function useAdminProperties(params: IPropertyQuery) {
  return useQuery({
    queryKey: [...PROPERTY_KEYS.all, "admin", params],
    queryFn: () => getAllPropertiesForAdmin(params),
  });
}

export function useCreateProperty() {
  return useMutation({ mutationFn: createProperty });
}

export function useUpdateProperty() {
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: IUpdatePropertyPayload;
    }) => updateProperty(id, payload),
  });
}

export function useDeleteProperty() {
  return useMutation({ mutationFn: deleteProperty });
}

export function useUpdatePropertyStatus() {
  return useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string;
      status: PropertyStatusUpdate;
    }) => updatePropertyStatus(id, status),
  });
}
