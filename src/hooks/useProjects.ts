import { useQuery } from '@tanstack/react-query';

export type ProjectRecord = {
  title: string;
  slug?: string;
  price?: string;
  area?: string;
  buildingArea?: string;
  terracesArea?: string;
  size?: string;
  buildTime?: string;
  imageUrl?: string;
  url?: string;
  gallery?: string[];
  plans?: string[];
  planVariants?: string[];
  about?: string;
  floors?: number;
  width?: string;
  length?: string;
  stats?: { bathrooms?: number; garage?: number; bedrooms?: number; wardrobes?: number; livingRooms?: number };
};

async function fetchProjects(): Promise<ProjectRecord[]> {
  const res = await fetch('/projects.json', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch projects.json');
  const data = await res.json();
  if (!Array.isArray(data)) throw new Error('Invalid projects.json format');
  return data as ProjectRecord[];
}

export function useProjects(options?: { enabled?: boolean; staleTime?: number }) {
  return useQuery<ProjectRecord[]>({
    queryKey: ['projects'],
    queryFn: fetchProjects,
    staleTime: options?.staleTime ?? 1000 * 60 * 10, // 10 minutes
    enabled: options?.enabled ?? true,
  });
}


