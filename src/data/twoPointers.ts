import { Question } from '../types';

export const twoPointersQuestions: Question[] = [
  {
    id: 13,
    title: "Valid Palindrome",
    description: "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers. Given a string s, return true if it is a palindrome, or false otherwise.",
    examples: [
      {
        input: "s = \"A man, a plan, a canal: Panama\"",
        output: "true",
        explanation: "\"amanaplanacanalpanama\" is a palindrome."
      },
      {
        input: "s = \"race a car\"",
        output: "false",
        explanation: "\"raceacar\" is not a palindrome."
      }
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public boolean isPalindrome(String s) {
    String filtered = s.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
    String reversed = new StringBuilder(filtered).reverse().toString();
    return filtered.equals(reversed);
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        explanation: "We first convert the string to lowercase and remove non-alphanumeric characters. Then we reverse the resulting string and check if it's equal to the original."
      },
      {
        approach: "Optimal",
        code: `public boolean isPalindrome(String s) {
    int left = 0;
    int right = s.length() - 1;
    
    while (left < right) {
        // Skip non-alphanumeric characters
        while (left < right && !Character.isLetterOrDigit(s.charAt(left))) {
            left++;
        }
        while (left < right && !Character.isLetterOrDigit(s.charAt(right))) {
            right--;
        }
        
        // Compare characters
        if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) {
            return false;
        }
        
        left++;
        right--;
    }
    
    return true;
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        explanation: "We use two pointers starting from the ends of the string. We skip non-alphanumeric characters and compare characters after converting them to lowercase."
      }
    ],
    leetCodeUrl: "https://leetcode.com/problems/valid-palindrome/",
    difficulty: "Easy",
    category: "twoPointers"
  },
  {
    id: 14,
    title: "Two Sum II - Input Array Is Sorted",
    description: "Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number. Let these two numbers be numbers[index1] and numbers[index2] where 1 <= index1 < index2 <= numbers.length. Return the indices of the two numbers, index1 and index2, added by one as an integer array [index1, index2] of length 2.",
    examples: [
      {
        input: "numbers = [2,7,11,15], target = 9",
        output: "[1,2]",
        explanation: "The sum of 2 and 7 is 9. Therefore, index1 = 1, index2 = 2. We return [1, 2]."
      },
      {
        input: "numbers = [2,3,4], target = 6",
        output: "[1,3]",
        explanation: "The sum of 2 and 4 is 6. Therefore index1 = 1, index2 = 3. We return [1, 3]."
      }
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public int[] twoSum(int[] numbers, int target) {
    for (int i = 0; i < numbers.length; i++) {
        for (int j = i + 1; j < numbers.length; j++) {
            if (numbers[i] + numbers[j] == target) {
                return new int[] {i + 1, j + 1};
            }
        }
    }
    return new int[] {-1, -1};
}`,
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        explanation: "We check all possible pairs of numbers to find one that adds up to the target."
      },
      {
        approach: "Optimal",
        code: `public int[] twoSum(int[] numbers, int target) {
    int left = 0;
    int right = numbers.length - 1;
    
    while (left < right) {
        int sum = numbers[left] + numbers[right];
        
        if (sum == target) {
            return new int[] {left + 1, right + 1};
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    
    return new int[] {-1, -1};
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        explanation: "We use two pointers starting from the ends of the array. If the sum is less than the target, we move the left pointer to the right. If the sum is greater than the target, we move the right pointer to the left."
      }
    ],
    leetCodeUrl: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/",
    difficulty: "Medium",
    category: "twoPointers"
  },
  {
    id: 15,
    title: "3Sum",
    description: "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.",
    examples: [
      {
        input: "nums = [-1,0,1,2,-1,-4]",
        output: "[[-1,-1,2],[-1,0,1]]",
        explanation: "The distinct triplets are [-1,0,1] and [-1,-1,2]. Notice that the order of the output and the order of the triplets does not matter."
      },
      {
        input: "nums = []",
        output: "[]"
      }
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public List<List<Integer>> threeSum(int[] nums) {
    Set<List<Integer>> resultSet = new HashSet<>();
    
    for (int i = 0; i < nums.length; i++) {
        for (int j = i + 1; j < nums.length; j++) {
            for (int k = j + 1; k < nums.length; k++) {
                if (nums[i] + nums[j] + nums[k] == 0) {
                    List<Integer> triplet = Arrays.asList(nums[i], nums[j], nums[k]);
                    Collections.sort(triplet);
                    resultSet.add(triplet);
                }
            }
        }
    }
    
    return new ArrayList<>(resultSet);
}`,
        timeComplexity: "O(n³)",
        spaceComplexity: "O(n)",
        explanation: "We check all possible triplets and add those that sum to zero to a set to avoid duplicates."
      },
      {
        approach: "Optimal",
        code: `public List<List<Integer>> threeSum(int[] nums) {
    Arrays.sort(nums);
    List<List<Integer>> result = new ArrayList<>();
    
    for (int i = 0; i < nums.length - 2; i++) {
        // Skip duplicates
        if (i > 0 && nums[i] == nums[i - 1]) continue;
        
        int left = i + 1;
        int right = nums.length - 1;
        
        while (left < right) {
            int sum = nums[i] + nums[left] + nums[right];
            
            if (sum < 0) {
                left++;
            } else if (sum > 0) {
                right--;
            } else {
                result.add(Arrays.asList(nums[i], nums[left], nums[right]));
                
                // Skip duplicates
                while (left < right && nums[left] == nums[left + 1]) left++;
                while (left < right && nums[right] == nums[right - 1]) right--;
                
                left++;
                right--;
            }
        }
    }
    
    return result;
}`,
        timeComplexity: "O(n²)",
        spaceComplexity: "O(n)",
        explanation: "We sort the array and use a two-pointer approach. For each element, we use two pointers to find pairs that, together with the current element, sum to zero."
      }
    ],
    leetCodeUrl: "https://leetcode.com/problems/3sum/",
    difficulty: "Medium",
    category: "twoPointers"
  },
  {
    id: 16,
    title: "Container With Most Water",
    description: "Given n non-negative integers a1, a2, ..., an , where each represents a point at coordinate (i, ai). n vertical lines are drawn such that the two endpoints of the line i is at (i, ai) and (i, 0). Find two lines, which, together with the x-axis, forms a container, such that the container contains the most water.",
    examples: [
      {
        input: "height = [1,8,6,2,5,4,8,3,7]",
        output: "49",
        explanation: "The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49."
      },
      {
        input: "height = [1,1]",
        output: "1"
      }
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public int maxArea(int[] height) {
    int maxArea = 0;
    for (int i = 0; i < height.length; i++) {
        for (int j = i + 1; j < height.length; j++) {
            int width = j - i;
            int h = Math.min(height[i], height[j]);
            maxArea = Math.max(maxArea, width * h);
        }
    }
    return maxArea;
}`,
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        explanation: "We check all possible pairs of lines and calculate the area of water they can contain."
      },
      {
        approach: "Optimal",
        code: `public int maxArea(int[] height) {
    int maxArea = 0;
    int left = 0;
    int right = height.length - 1;
    
    while (left < right) {
        int width = right - left;
        int h = Math.min(height[left], height[right]);
        maxArea = Math.max(maxArea, width * h);
        
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    
    return maxArea;
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        explanation: "We use a two-pointer approach. Start with the widest container and move inward. At each step, move the pointer pointing to the shorter line, as moving the taller line would only decrease the area."
      }
    ],
    leetCodeUrl: "https://leetcode.com/problems/container-with-most-water/",
    difficulty: "Medium",
    category: "twoPointers"
  },
  {
    id: 17,
    title: "Trapping Rain Water",
    description: "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
    examples: [
      {
        input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]",
        output: "6",
        explanation: "The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped."
      },
      {
        input: "height = [4,2,0,3,2,5]",
        output: "9"
      }
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public int trap(int[] height) {
    int totalWater = 0;
    
    for (int i = 0; i < height.length; i++) {
        int leftMax = 0;
        int rightMax = 0;
        
        // Find maximum height to the left
        for (int j = 0; j <= i; j++) {
            leftMax = Math.max(leftMax, height[j]);
        }
        
        // Find maximum height to the right
        for (int j = i; j < height.length; j++) {
            rightMax = Math.max(rightMax, height[j]);
        }
        
        // Add water trapped at current position
        totalWater += Math.min(leftMax, rightMax) - height[i];
    }
    
    return totalWater;
}`,
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        explanation: "For each position, we find the maximum height to the left and to the right. The water trapped at that position is the minimum of these two heights minus the height at the current position."
      },
      {
        approach: "Optimal",
        code: `public int trap(int[] height) {
    if (height.length == 0) return 0;
    
    int left = 0;
    int right = height.length - 1;
    int leftMax = height[left];
    int rightMax = height[right];
    int result = 0;
    
    while (left < right) {
        if (leftMax < rightMax) {
            left++;
            leftMax = Math.max(leftMax, height[left]);
            result += leftMax - height[left];
        } else {
            right--;
            rightMax = Math.max(rightMax, height[right]);
            result += rightMax - height[right];
        }
    }
    
    return result;
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        explanation: "We use a two-pointer approach. We maintain the maximum height seen from both the left and right sides. At each step, we move the pointer pointing to the smaller maximum height, as the smaller height is the limiting factor for water trapping."
      }
    ],
    leetCodeUrl: "https://leetcode.com/problems/trapping-rain-water/",
    difficulty: "Hard",
    category: "twoPointers"
  }
];