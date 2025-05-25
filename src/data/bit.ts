import { Question } from "../types";

export const bitQuestions: Question[] = [
  {
    id: "number-of-1-bits",
    title: "Number of 1 Bits",
    description: "Write a function that takes the binary representation of an unsigned integer and returns the number of '1' bits it has (also known as the Hamming weight).",
    difficulty: "Easy",
    tags: ["Divide and Conquer", "Bit Manipulation"],
    examples: [
      {
        input: "n = 00000000000000000000000000001011",
        output: "3",
        explanation: "The input binary string 00000000000000000000000000001011 has a total of three '1' bits."
      },
      {
        input: "n = 00000000000000000000000010000000",
        output: "1",
        explanation: "The input binary string 00000000000000000000000010000000 has a total of one '1' bit."
      }
    ],
    bruteForceSolution: `public class Solution {
    public int hammingWeight(int n) {
        int count = 0;
        while (n != 0) {
            if ((n & 1) == 1) {
                count++;
            }
            n >>>= 1; // Unsigned right shift
        }
        return count;
    }
}`,
    optimalSolution: `public class Solution {
    public int hammingWeight(int n) {
        int count = 0;
        while (n != 0) {
            n &= (n - 1); // Clear the lowest set bit
            count++;
        }
        return count;
    }
}`,
    bruteForceComplexity: {
      time: "O(32)",
      space: "O(1)",
      reasoning: "Check each bit position in 32-bit integer."
    },
    optimalComplexity: {
      time: "O(k)",
      space: "O(1)",
      reasoning: "Only iterate through set bits, where k is number of 1-bits."
    },
    leetcodeUrl: "https://leetcode.com/problems/number-of-1-bits/"
  }
];