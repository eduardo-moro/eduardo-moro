
export interface TabNewsPublication {
  id: string;
  owner_id: string;
  parent_id: string | null;
  slug: string;
  title: string;
  status: string;
  source_url: string | null;
  created_at: string;
  updated_at: string;
  published_at: string;
  deleted_at: string | null;
  tabcoins: number;
  owner_username: string;
  children_deep_count: number;
  body: string;
}

export async function getTabNewsPublications(
  username: string,
  page: number = 1,
  per_page: number = 5,
  strategy: string = 'new'
): Promise<TabNewsPublication[]> {
  try {
    const response = await fetch(
      `https://www.tabnews.com.br/api/v1/contents/${username}?page=${page}&per_page=${per_page}&strategy=${strategy}`
    );

    if (!response.ok) {
      console.error(`Error fetching TabNews publications for ${username}: ${response.status} ${response.statusText}`);
      return [];
    }

    const data: TabNewsPublication[] = await response.json();
    // Filter out comments, keeping only root posts (where parent_id is null)
    return data.filter(publication => publication.parent_id === null);
  } catch (error) {
    console.error(`Exception fetching TabNews publications for ${username}:`, error);
    return [];
  }
}

export async function getTabNewsPublicationBySlug(
  username: string,
  slug: string
): Promise<TabNewsPublication | null> {
  try {
    const response = await fetch(
      `https://www.tabnews.com.br/api/v1/contents/${username}/${slug}`
    );

    if (!response.ok) {
      console.error(`Error fetching TabNews publication by slug ${slug} for ${username}: ${response.status} ${response.statusText}`);
      return null;
    }

    const data: TabNewsPublication = await response.json();
    return data;
  } catch (error) {
    console.error(`Exception fetching TabNews publication by slug ${slug} for ${username}:`, error);
    return null;
  }
}
