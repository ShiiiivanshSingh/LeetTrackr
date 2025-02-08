export async function fetchLeetCodeStats(username) {
  try {
    const response = await fetch('/api/leetcode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch stats');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching LeetCode stats:', error);
    throw error;
  }
} 