import { Question } from "../types";

export const greedyQuestions: Question[] = [
  {
    id: "maximum-subarray",
    title: "Maximum Subarray",
    description: "Given an integer array nums, find the subarray with the largest sum, and return its sum.",
    difficulty: "Medium",
    tags: ["Array", "Divide and Conquer", "Dynamic Programming"],
    examples: [
      {
        input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        output: "6",
        explanation: "The subarray [4,-1,2,1] has the largest sum 6."
      },
      {
        input: "nums = [1]",
        output: "1",
        explanation: "The subarray [1] has the largest sum 1."
      }
    ],
    bruteForceSolution: `class Solution {
    public int maxSubArray(int[] nums) {
        int maxSum = Integer.MIN_VALUE;
        
        for (int i = 0; i < nums.length; i++) {
            int currentSum = 0;
            for (int j = i; j < nums.length; j++) {
                currentSum += nums[j];
                maxSum = Math.max(maxSum, currentSum);
            }
        }
        
        return maxSum;
    }
}`,
    optimalSolution: `class Solution {
    public int maxSubArray(int[] nums) {
        int maxSum = nums[0];
        int currentSum = nums[0];
        
        for (int i = 1; i < nums.length; i++) {
            currentSum = Math.max(nums[i], currentSum + nums[i]);
            maxSum = Math.max(maxSum, currentSum);
        }
        
        return maxSum;
    }
}`,
    bruteForceComplexity: {
      time: "O(n²)",
      space: "O(1)",
      reasoning: "Check all possible subarrays with nested loops."
    },
    optimalComplexity: {
      time: "O(n)",
      space: "O(1)",
      reasoning: "Kadane's algorithm - single pass with greedy choice."
    },
    leetcodeUrl: "https://leetcode.com/problems/maximum-subarray/"
  }
];