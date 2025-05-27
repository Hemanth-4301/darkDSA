import { Question } from '../types';

export const bitQuestions: Question[] = [
  {
    id: 111,
    title: "Single Number",
    description: "Given a non-empty array of integers nums, every element appears twice except for one. Find that single one. You must implement a solution with a linear runtime complexity and use only constant extra space.",
    examples: [
      {
        input: "nums = [2,2,1]",
        output: "1"
      },
      {
        input: "nums = [4,1,2,1,2]",
        output: "4"
      }
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public int singleNumber(int[] nums) {
    Map<Integer, Integer> count = new HashMap<>();
    
    for (int num : nums) {
        count.put(num, count.getOrDefault(num, 0) + 1);
    }
    
    for (Map.Entry<Integer, Integer> entry : count.entrySet()) {
        if (entry.getValue() == 1) {
            return entry.getKey();
        }
    }
    
    return 0;
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        explanation: "We use a HashMap to count occurrences of each number. Then we find the number that appears only once."
      },
      {
        approach: "Optimal",
        code: `public int singleNumber(int[] nums) {
    int result = 0;
    for (int num : nums) {
        result ^= num;
    }
    return result;
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        explanation: "We use XOR operation. XOR of a number with itself is 0, and XOR of a number with 0 is the number itself. So XORing all numbers will leave us with the single number."
      }
    ],
    leetCodeUrl: "https://leetcode.com/problems/single-number/",
    difficulty: "Easy",
    category: "bit"
  },
  {
    id: 112,
    title: "Number of 1 Bits",
    description: "Write a function that takes an unsigned integer and returns the number of '1' bits it has (also known as the Hamming weight).",
    examples: [
      {
        input: "n = 00000000000000000000000000001011",
        output: "3",
        explanation: "The input binary string has a total of three '1' bits."
      },
      {
        input: "n = 00000000000000000000000010000000",
        output: "1",
        explanation: "The input binary string has a total of one '1' bit."
      }
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public int hammingWeight(int n) {
    String binary = Integer.toBinaryString(n);
    int count = 0;
    
    for (char c : binary.toCharArray()) {
        if (c == '1') {
            count++;
        }
    }
    
    return count;
}`,
        timeComplexity: "O(1)",
        spaceComplexity: "O(1)",
        explanation: "We convert the number to binary string and count the '1' characters."
      },
      {
        approach: "Optimal",
        code: `public int hammingWeight(int n) {
    int count = 0;
    while (n != 0) {
        count += (n & 1);
        n >>>= 1;
    }
    return count;
}`,
        timeComplexity: "O(1)",
        spaceComplexity: "O(1)",
        explanation: "We use bitwise AND with 1 to check the least significant bit, then right shift the number. This avoids string conversion."
      }
    ],
    leetCodeUrl: "https://leetcode.com/problems/number-of-1-bits/",
    difficulty: "Easy",
    category: "bit"
  },
  {
    id: 113,
    title: "Counting Bits",
    description: "Given an integer n, return an array ans of length n + 1 such that for each i (0 <= i <= n), ans[i] is the number of 1's in the binary representation of i.",
    examples: [
      {
        input: "n = 2",
        output: "[0,1,1]",
        explanation: "0 --> 0 (0 '1' bits), 1 --> 1 (1 '1' bit), 2 --> 10 (1 '1' bit)"
      },
      {
        input: "n = 5",
        output: "[0,1,1,2,1,2]",
        explanation: "0 --> 0 (0 '1' bits), 1 --> 1 (1 '1' bit), 2 --> 10 (1 '1' bit), 3 --> 11 (2 '1' bits), 4 --> 100 (1 '1' bit), 5 --> 101 (2 '1' bits)"
      }
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public int[] countBits(int n) {
    int[] result = new int[n + 1];
    
    for (int i = 0; i <= n; i++) {
        result[i] = Integer.bitCount(i);
    }
    
    return result;
}`,
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(1)",
        explanation: "We use Java's built-in bitCount method for each number from 0 to n."
      },
      {
        approach: "Optimal",
        code: `public int[] countBits(int n) {
    int[] result = new int[n + 1];
    
    for (int i = 1; i <= n; i++) {
        result[i] = result[i >> 1] + (i & 1);
    }
    
    return result;
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        explanation: "We use dynamic programming. For any number i, the number of 1's is equal to the number of 1's in i/2 plus 1 if i is odd."
      }
    ],
    leetCodeUrl: "https://leetcode.com/problems/counting-bits/",
    difficulty: "Easy",
    category: "bit"
  },
  {
    id: 114,
    title: "Missing Number",
    description: "Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.",
    examples: [
      {
        input: "nums = [3,0,1]",
        output: "2",
        explanation: "n = 3 since there are 3 numbers, so all numbers are in the range [0,3]. 2 is the missing number in the range since it does not appear in nums."
      },
      {
        input: "nums = [0,1]",
        output: "2",
        explanation: "n = 2 since there are 2 numbers, so all numbers are in the range [0,2]. 2 is the missing number in the range since it does not appear in nums."
      }
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public int missingNumber(int[] nums) {
    Arrays.sort(nums);
    
    for (int i = 0; i < nums.length; i++) {
        if (nums[i] != i) {
            return i;
        }
    }
    
    return nums.length;
}`,
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(1)",
        explanation: "We sort the array and check if each index matches its value. The first mismatch is our answer."
      },
      {
        approach: "Optimal",
        code: `public int missingNumber(int[] nums) {
    int n = nums.length;
    int result = n;
    
    for (int i = 0; i < n; i++) {
        result ^= i ^ nums[i];
    }
    
    return result;
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        explanation: "We use XOR. XORing a number with itself gives 0. We XOR all numbers from 0 to n with all numbers in array. The remaining number is our answer."
      }
    ],
    leetCodeUrl: "https://leetcode.com/problems/missing-number/",
    difficulty: "Easy",
    category: "bit"
  },
  {
    id: 115,
    title: "Reverse Bits",
    description: "Reverse bits of a given 32 bits unsigned integer.",
    examples: [
      {
        input: "n = 00000010100101000001111010011100",
        output: "964176192 (00111001011110000010100101000000)",
        explanation: "The input binary string 00000010100101000001111010011100 represents the unsigned integer 43261596, so return 964176192 which its binary representation is 00111001011110000010100101000000."
      },
      {
        input: "n = 11111111111111111111111111111101",
        output: "3221225471 (10111111111111111111111111111111)"
      }
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public int reverseBits(int n) {
    String binary = Integer.toBinaryString(n);
    StringBuilder padded = new StringBuilder();
    
    // Pad with leading zeros
    for (int i = 0; i < 32 - binary.length(); i++) {
        padded.append('0');
    }
    padded.append(binary);
    
    // Reverse and convert back to integer
    String reversed = padded.reverse().toString();
    return (int) Long.parseLong(reversed, 2);
}`,
        timeComplexity: "O(1)",
        spaceComplexity: "O(1)",
        explanation: "We convert to binary string, pad with zeros, reverse the string, and convert back to integer."
      },
      {
        approach: "Optimal",
        code: `public int reverseBits(int n) {
    int result = 0;
    
    for (int i = 0; i < 32; i++) {
        result <<= 1;
        result |= (n & 1);
        n >>>= 1;
    }
    
    return result;
}`,
        timeComplexity: "O(1)",
        spaceComplexity: "O(1)",
        explanation: "We process each bit from right to left. For each bit in n, we shift result left and add the bit to result's least significant position."
      }
    ],
    leetCodeUrl: "https://leetcode.com/problems/reverse-bits/",
    difficulty: "Easy",
    category: "bit"
  }
];