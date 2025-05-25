import { Question } from "../types";

export const dp2dQuestions: Question[] = [
  {
    id: "unique-paths",
    title: "Unique Paths",
    description: "There is a robot on an m x n grid. The robot is initially located at the top-left corner (i.e., grid[0][0]). The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]). The robot can only move either down or right at any point in time.\n\nGiven the two integers m and n, return the number of possible unique paths that the robot can take to reach the bottom-right corner.",
    difficulty: "Medium",
    tags: ["Math", "Dynamic Programming", "Combinatorics"],
    examples: [
      {
        input: "m = 3, n = 7",
        output: "28"
      },
      {
        input: "m = 3, n = 2",
        output: "3",
        explanation: "From the top-left corner, there are a total of 3 ways to reach the bottom-right corner:\n1. Right -> Down -> Down\n2. Down -> Down -> Right\n3. Down -> Right -> Down"
      }
    ],
    bruteForceSolution: `class Solution {
    public int uniquePaths(int m, int n) {
        return helper(0, 0, m, n);
    }
    
    private int helper(int row, int col, int m, int n) {
        if (row == m - 1 && col == n - 1) return 1;
        if (row >= m || col >= n) return 0;
        
        return helper(row + 1, col, m, n) + helper(row, col + 1, m, n);
    }
}`,
    optimalSolution: `class Solution {
    public int uniquePaths(int m, int n) {
        int[][] dp = new int[m][n];
        
        // Initialize first row and column
        for (int i = 0; i < m; i++) {
            dp[i][0] = 1;
        }
        for (int j = 0; j < n; j++) {
            dp[0][j] = 1;
        }
        
        // Fill the dp table
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                dp[i][j] = dp[i-1][j] + dp[i][j-1];
            }
        }
        
        return dp[m-1][n-1];
    }
}`,
    bruteForceComplexity: {
      time: "O(2^(m+n))",
      space: "O(m+n)",
      reasoning: "Recursive solution explores all possible paths exponentially."
    },
    optimalComplexity: {
      time: "O(m * n)",
      space: "O(m * n)",
      reasoning: "2D DP table filled once, each cell computed in constant time."
    },
    leetcodeUrl: "https://leetcode.com/problems/unique-paths/"
  }
];