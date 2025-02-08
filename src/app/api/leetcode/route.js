export async function POST(request) {
  try {
    const { username } = await request.json();

    const query = `
      query userProfile($username: String!) {
        matchedUser(username: $username) {
          submitStats {
            acSubmissionNum {
              difficulty
              count
              submissions
            }
            totalSubmissionNum {
              difficulty
              count
              submissions
            }
          }
          profile {
            ranking
            reputation
            starRating
          }
        }
      }
    `;

    const response = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Referer': 'https://leetcode.com',
        'Origin': 'https://leetcode.com',
      },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
    });

    const data = await response.json();

    if (!data.data.matchedUser) {
      return Response.json({ error: 'User not found' }, { status: 404 });
    }

    return Response.json(data.data.matchedUser);
  } catch (error) {
    console.error('Error fetching LeetCode stats:', error);
    return Response.json(
      { error: 'Failed to fetch LeetCode stats' }, 
      { status: 500 }
    );
  }
} 