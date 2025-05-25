import { Question } from "../types";

export const dp1dQuestions: Question[] = [
  {
    id: "climbing-stairs",
    title: "Climbing Stairs",
    description: "You are climbing a staircase. It takes n steps to reach the top.\n\nEach time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
    difficulty: "Easy",
    tags: ["Math", "Dynamic Programming", "Memoization"],
    examples: [
      {
        input: "n = 2",
        output: "2",
        explanation: "There are two ways to climb to the top.\n1. 1 step + 1 step\n2. 2 steps"
      },
      {
        input: "n = 3",
        output: "3",
        explanation: "There are three ways to climb to the top.\n1. 1 step + 1 step + 1 step\n2. 1 step + 2 steps\n3. 2 steps + 1 step"
      }
    ],
    bruteForceSolution: `class Solution {
    public int climbStairs(int n) {
        return helper(n);
    }
    
    private int helper(int n) {
        if (n <= 2) return n;
        return helper(n - 1) + helper(n - 2);
    }
}`,
    optimalSolution: `class Solution {
    public int climbStairs(int n) {
        if (n <= 2) return n;
        
        int prev2 = 1; // f(1)
        int prev1 = 2; // f(2)
        
        for (int i = 3; i <= n; i++) {
            int current = prev1 + prev2;
            prev2 = prev1;
            prev1 = current;
        }
        
        return prev1;
    }
}`,
    bruteForceComplexity: {
      time: "O(2^n)",
      space: "O(n)",
      reasoning: "Recursive solution explores all possible combinations exponentially."
    },
    optimalComplexity: {
      time: "O(n)",
      space: "O(1)",
      reasoning: "Bottom-up approach with constant space using two variables."
    },
    leetcodeUrl: "https://leetcode.com/problems/climbing-stairs/"
  },
  {
    id: "house-robber",
    title: "House Robber",
    description: "You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night.\n\nGiven an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.",
    difficulty: "Medium",
    tags: ["Array", "Dynamic Programming"],
    examples: [
      {
        input: "nums = [1,2,3,1]",
        output: "4",
        explanation: "Rob house 1 (money = 1) and then rob house 3 (money = 3).\nTotal amount you can rob = 1 + 3 = 4."
      },
      {
        input: "nums = [2,7,9,3,1]",
        output: "12",
        explanation: "Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1).\nTotal amount you can rob = 2 + 9 + 1 = 12."
      }
    ],
    bruteForceSolution: `class Solution {
    public int rob(int[] nums) {
        return helper(nums, 0);
    }
    
    private int helper(int[] nums, int index) {
        if (index >= nums.length) return 0;
        
        // Rob current house + skip next house
        int robCurrent = nums[index] + helper(nums, index + 2);
        
        // Skip current house
        int skipCurrent = helper(nums, index + 1);
        
        return Math.max(robCurrent, skipCurrent);
    }
}`,
    optimalSolution: `class Solution {
    public int rob(int[] nums) {
        if (nums.length == 1) return nums[0];
        
        int prev2 = nums[0]; // Maximum money up to house i-2
        int prev1 = Math.max(nums[0], nums[1]); // Maximum money up to house i-1
        
        for (int i = 2; i < nums.length; i++) {
            int current = Math.max(prev1, prev2 + nums[i]);
            prev2 = prev1;
            prev1 = current;
        }
        
        return prev1;
    }
}`,
    bruteForceComplexity: {
      time: "O(2^n)",
      space: "O(n)",
      reasoning: "Recursive solution with overlapping subproblems."
    },
    optimalComplexity: {
      time: "O(n)",
      space: "O(1)",
      reasoning: "Bottom-up DP with constant space optimization."
    },
    leetcodeUrl: "https://leetcode.com/problems/house-robber/"
  }
];