export interface GitHubRepo {
  name: string;
  description: string;
  url: string;
  stargazerCount: number;
  forkCount: number;
}

export async function getGitHubPinnedRepos(username: string): Promise<GitHubRepo[]> {
  const GITHUB_PAT = process.env.NEXT_PUBLIC_GITHUB_PAT;

  if (!GITHUB_PAT) {
    console.error("GitHub Personal Access Token (GITHUB_PAT) not found in environment variables.");
    return [];
  }

  const query = `
    {
      user(login: "${username}") {
        pinnedItems(first: 4, types: REPOSITORY) {
          nodes {
            ... on Repository {
              name
              description
              url
              stargazerCount
              forkCount
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `bearer ${GITHUB_PAT}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error fetching GitHub pinned repos: ${response.status} ${response.statusText} - ${errorText}`);
      return [];
    }

    const data = await response.json();
    const pinnedItems = data.data.user.pinnedItems.nodes;

    return pinnedItems.map((item: GitHubRepo) => ({
      name: item.name,
      description: item.description,
      url: item.url,
      stargazerCount: item.stargazerCount,
      forkCount: item.forkCount,
    }));
  } catch (error) {
    console.error("Exception fetching GitHub pinned repos:", error);
    return [];
  }
}
