import { fetchApi } from "./apiClient";

import {Certification} from "@/types/certification";

/**
 * Fetches all certifications.
 */
export const getCertifications = async (): Promise<Certification[]> => {
    return fetchApi<Certification[]>('/certifications');
};

/**
 * Fetches a certification by its ID.
 */
export const getCertificationById = async (id: string): Promise<Certification | undefined> => {
    const certifications = await fetchApi<Certification[]>('/certifications');
    return certifications.find(certification => certification.id === id);
};

/**
 * Fetches featured certifications with an optional limit.
 */
export const getFeaturedCertifications = async (limit?: number): Promise<Certification[]> => {
    const certifications = await fetchApi<Certification[]>('/certifications');
    const featured = certifications.filter(certification => certification.featured);
    return limit ? featured.slice(0, limit) : featured;
};