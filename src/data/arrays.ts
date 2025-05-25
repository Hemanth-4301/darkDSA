import { Question } from '../types';

export const arrayQuestions: Question[] = [
  {
    id: 1,
    title: "Two Sum",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]"
      }
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public int[] twoSum(int[] nums, int target) {
    for (int i = 0; i < nums.length; i++) {
        for (int j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] == target) {
                return new int[] { i, j };
            }
        }
    }
    return new int[] {};
}`,
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        explanation: "We use two nested loops to check every possible pair of numbers in the array. For each pair, we check if they sum to the target."
      },
      {
        approach: "Optimal",
        code: `public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        if (map.containsKey(complement)) {
            return new int[] { map.get(complement), i };
        }
        map.put(nums[i], i);
    }
    return new int[] {};
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        explanation: "We use a HashMap to store each number and its index. For each number, we check if its complement (target - current number) exists in the map. If it does, we've found our solution."
      }
    ],
    leetCodeUrl: "https://leetcode.com/problems/two-sum/",
    difficulty: "Easy",
    category: "arrays"
  },
  {
    id: 2,
    title: "Best Time to Buy and Sell Stock",
    description: "You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.",
    examples: [
      {
        input: "prices = [7,1,5,3,6,4]",
        output: "5",
        explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5."
      },
      {
        input: "prices = [7,6,4,3,1]",
        output: "0",
        explanation: "In this case, no transactions are done and the max profit = 0."
      }
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public int maxProfit(int[] prices) {
    int maxProfit = 0;
    for (int i = 0; i < prices.length; i++) {
        for (int j = i + 1; j < prices.length; j++) {
            int profit = prices[j] - prices[i];
            maxProfit = Math.max(maxProfit, profit);
        }
    }
    return maxProfit;
}`,
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        explanation: "We check every possible pair of buy and sell dates to find the maximum profit."
      },
      {
        approach: "Optimal",
        code: `public int maxProfit(int[] prices) {
    int minPrice = Integer.MAX_VALUE;
    int maxProfit = 0;
    for (int i = 0; i < prices.length; i++) {
        if (prices[i] < minPrice) {
            minPrice = prices[i];
        } else if (prices[i] - minPrice > maxProfit) {
            maxProfit = prices[i] - minPrice;
        }
    }
    return maxProfit;
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        explanation: "We track the minimum price seen so far and the maximum profit. For each price, we update the minimum price if the current price is lower, or update the maximum profit if selling at the current price yields a higher profit."
      }
    ],
    leetCodeUrl: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
    difficulty: "Easy",
    category: "arrays"
  },
  {
    id: 3,
    title: "Contains Duplicate",
    description: "Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.",
    examples: [
      {
        input: "nums = [1,2,3,1]",
        output: "true"
      },
      {
        input: "nums = [1,2,3,4]",
        output: "false"
      }
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public boolean containsDuplicate(int[] nums) {
    for (int i = 0; i < nums.length; i++) {
        for (int j = i + 1; j < nums.length; j++) {
            if (nums[i] == nums[j]) {
                return true;
            }
        }
    }
    return false;
}`,
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        explanation: "We check every pair of numbers in the array to see if any two are equal."
      },
      {
        approach: "Optimal",
        code: `public boolean containsDuplicate(int[] nums) {
    Set<Integer> seen = new HashSet<>();
    for (int num : nums) {
        if (seen.contains(num)) {
            return true;
        }
        seen.add(num);
    }
    return false;
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        explanation: "We use a HashSet to keep track of numbers we've seen. If we encounter a number that's already in the set, we've found a duplicate."
      }
    ],
    leetCodeUrl: "https://leetcode.com/problems/contains-duplicate/",
    difficulty: "Easy",
    category: "arrays"
  },
  {
    id: 4,
    title: "Product of Array Except Self",
    description: "Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].",
    examples: [
      {
        input: "nums = [1,2,3,4]",
        output: "[24,12,8,6]"
      },
      {
        input: "nums = [-1,1,0,-3,3]",
        output: "[0,0,9,0,0]"
      }
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public int[] productExceptSelf(int[] nums) {
    int n = nums.length;
    int[] result = new int[n];
    for (int i = 0; i < n; i++) {
        int product = 1;
        for (int j = 0; j < n; j++) {
            if (j != i) {
                product *= nums[j];
            }
        }
        result[i] = product;
    }
    return result;
}`,
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        explanation: "For each element, we calculate the product of all other elements by iterating through the array again."
      },
      {
        approach: "Optimal",
        code: `public int[] productExceptSelf(int[] nums) {
    int n = nums.length;
    int[] result = new int[n];
    
    // Left products
    result[0] = 1;
    for (int i = 1; i < n; i++) {
        result[i] = result[i-1] * nums[i-1];
    }
    
    // Right products
    int rightProduct = 1;
    for (int i = n - 1; i >= 0; i--) {
        result[i] *= rightProduct;
        rightProduct *= nums[i];
    }
    
    return result;
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        explanation: "We compute the product of all elements to the left of each element, then multiply it by the product of all elements to the right. This gives us the product of all elements except the current one."
      }
    ],
    leetCodeUrl: "https://leetcode.com/problems/product-of-array-except-self/",
    difficulty: "Medium",
    category: "arrays"
  },
  {
    id: 5,
    title: "Maximum Subarray",
    description: "Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.",
    examples: [
      {
        input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        output: "6",
        explanation: "[4,-1,2,1] has the largest sum = 6."
      },
      {
        input: "nums = [1]",
        output: "1"
      }
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public int maxSubArray(int[] nums) {
    int maxSum = Integer.MIN_VALUE;
    for (int i = 0; i < nums.length; i++) {
        int currentSum = 0;
        for (int j = i; j < nums.length; j++) {
            currentSum += nums[j];
            maxSum = Math.max(maxSum, currentSum);
        }
    }
    return maxSum;
}`,
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        explanation: "We consider all possible subarrays and find the one with the maximum sum."
      },
      {
        approach: "Optimal",
        code: `public int maxSubArray(int[] nums) {
    int maxSum = nums[0];
    int currentSum = nums[0];
    
    for (int i = 1; i < nums.length; i++) {
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(maxSum, currentSum);
    }
    
    return maxSum;
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        explanation: "We use Kadane's algorithm. For each element, we decide whether to start a new subarray or extend the current one, depending on which gives a larger sum."
      }
    ],
    leetCodeUrl: "https://leetcode.com/problems/maximum-subarray/",
    difficulty: "Medium",
    category: "arrays"
  },
  {
    id: 6,
    title: "Maximum Product Subarray",
    description: "Given an integer array nums, find a contiguous non-empty subarray within the array that has the largest product, and return the product.",
    examples: [
      {
        input: "nums = [2,3,-2,4]",
        output: "6",
        explanation: "[2,3] has the largest product 6."
      },
      {
        input: "nums = [-2,0,-1]",
        output: "0",
        explanation: "The result cannot be 2, because [-2,-1] is not a subarray."
      }
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public int maxProduct(int[] nums) {
    int result = nums[0];
    for (int i = 0; i < nums.length; i++) {
        int product = 1;
        for (int j = i; j < nums.length; j++) {
            product *= nums[j];
            result = Math.max(result, product);
        }
    }
    return result;
}`,
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        explanation: "We consider all possible subarrays and find the one with the maximum product."
      },
      {
        approach: "Optimal",
        code: `public int maxProduct(int[] nums) {
    int maxSoFar = nums[0];
    int minSoFar = nums[0];
    int result = maxSoFar;
    
    for (int i = 1; i < nums.length; i++) {
        int curr = nums[i];
        int tempMax = Math.max(curr, Math.max(maxSoFar * curr, minSoFar * curr));
        minSoFar = Math.min(curr, Math.min(maxSoFar * curr, minSoFar * curr));
        
        maxSoFar = tempMax;
        result = Math.max(result, maxSoFar);
    }
    
    return result;
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        explanation: "We track both the maximum and minimum product ending at the current position. This is because a negative number can make a large negative product positive when multiplied by another negative number."
      }
    ],
    leetCodeUrl: "https://leetcode.com/problems/maximum-product-subarray/",
    difficulty: "Medium",
    category: "arrays"
  },
  {
    id: 7,
    title: "Find Minimum in Rotated Sorted Array",
    description: "Suppose an array of length n sorted in ascending order is rotated between 1 and n times. For example, the array nums = [0,1,2,4,5,6,7] might become [4,5,6,7,0,1,2]. Find the minimum element of this array.",
    examples: [
      {
        input: "nums = [3,4,5,1,2]",
        output: "1",
        explanation: "The original array was [1,2,3,4,5] rotated 3 times."
      },
      {
        input: "nums = [4,5,6,7,0,1,2]",
        output: "0",
        explanation: "The original array was [0,1,2,4,5,6,7] and it was rotated 4 times."
      }
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public int findMin(int[] nums) {
    int min = nums[0];
    for (int i = 1; i < nums.length; i++) {
        min = Math.min(min, nums[i]);
    }
    return min;
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        explanation: "We simply iterate through the array and find the minimum element."
      },
      {
        approach: "Optimal",
        code: `public int findMin(int[] nums) {
    int left = 0;
    int right = nums.length - 1;
    
    while (left < right) {
        int mid = left + (right - left) / 2;
        
        if (nums[mid] > nums[right]) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    
    return nums[left];
}`,
        timeComplexity: "O(log n)",
        spaceComplexity: "O(1)",
        explanation: "We use binary search. If the middle element is greater than the rightmost element, the minimum must be in the right half. Otherwise, it must be in the left half (including the middle element)."
      }
    ],
    leetCodeUrl: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",
    difficulty: "Medium",
    category: "arrays"
  },
  {
    id: 8,
    title: "Search in Rotated Sorted Array",
    description: "There is an integer array nums sorted in ascending order (with distinct values). Prior to being passed to your function, nums is possibly rotated at an unknown pivot index k (1 <= k < nums.length). Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.",
    examples: [
      {
        input: "nums = [4,5,6,7,0,1,2], target = 0",
        output: "4"
      },
      {
        input: "nums = [4,5,6,7,0,1,2], target = 3",
        output: "-1"
      }
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public int search(int[] nums, int target) {
    for (int i = 0; i < nums.length; i++) {
        if (nums[i] == target) {
            return i;
        }
    }
    return -1;
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        explanation: "We linearly search through the array to find the target."
      },
      {
        approach: "Optimal",
        code: `public int search(int[] nums, int target) {
    int left = 0;
    int right = nums.length - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (nums[mid] == target) {
            return mid;
        }
        
        // Check if left half is sorted
        if (nums[left] <= nums[mid]) {
            if (target >= nums[left] && target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } 
        // Right half is sorted
        else {
            if (target > nums[mid] && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    
    return -1;
}`,
        timeComplexity: "O(log n)",
        spaceComplexity: "O(1)",
        explanation: "We use binary search. At each step, we determine which half of the array is sorted. If the target is in the sorted half, we search there; otherwise, we search in the other half."
      }
    ],
    leetCodeUrl: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
    difficulty: "Medium",
    category: "arrays"
  },
  {
    id: 9,
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
    category: "arrays"
  },
  {
    id: 10,
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
    category: "arrays"
  },
  {
    id: 11,
    title: "Merge Intervals",
    description: "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.",
    examples: [
      {
        input: "intervals = [[1,3],[2,6],[8,10],[15,18]]",
        output: "[[1,6],[8,10],[15,18]]",
        explanation: "Since intervals [1,3] and [2,6] overlap, merge them into [1,6]."
      },
      {
        input: "intervals = [[1,4],[4,5]]",
        output: "[[1,5]]",
        explanation: "Intervals [1,4] and [4,5] are considered overlapping."
      }
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public int[][] merge(int[][] intervals) {
    List<int[]> result = new ArrayList<>();
    
    for (int i = 0; i < intervals.length; i++) {
        int[] newInterval = intervals[i];
        boolean merged = false;
        
        for (int j = 0; j < result.size(); j++) {
            int[] existingInterval = result.get(j);
            
            // Check if intervals overlap
            if (Math.max(existingInterval[0], newInterval[0]) <= Math.min(existingInterval[1], newInterval[1])) {
                existingInterval[0] = Math.min(existingInterval[0], newInterval[0]);
                existingInterval[1] = Math.max(existingInterval[1], newInterval[1]);
                merged = true;
                break;
            }
        }
        
        if (!merged) {
            result.add(newInterval);
        }
    }
    
    return result.toArray(new int[result.size()][]);
}`,
        timeComplexity: "O(n²)",
        spaceComplexity: "O(n)",
        explanation: "For each interval, we check if it can be merged with any existing interval in the result. If not, we add it to the result."
      },
      {
        approach: "Optimal",
        code: `public int[][] merge(int[][] intervals) {
    if (intervals.length <= 1) {
        return intervals;
    }
    
    // Sort by starting time
    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
    
    List<int[]> result = new ArrayList<>();
    int[] currentInterval = intervals[0];
    result.add(currentInterval);
    
    for (int[] interval : intervals) {
        int currentEnd = currentInterval[1];
        int nextStart = interval[0];
        int nextEnd = interval[1];
        
        // If current interval overlaps with the next one, merge them
        if (currentEnd >= nextStart) {
            currentInterval[1] = Math.max(currentEnd, nextEnd);
        } else {
            // No overlap, add interval to result
            currentInterval = interval;
            result.add(currentInterval);
        }
    }
    
    return result.toArray(new int[result.size()][]);
}`,
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(n)",
        explanation: "We sort the intervals by their start times. Then, we iterate through the sorted intervals and merge overlapping ones."
      }
    ],
    leetCodeUrl: "https://leetcode.com/problems/merge-intervals/",
    difficulty: "Medium",
    category: "arrays"
  },
  {
    id: 12,
    title: "Insert Interval",
    description: "You are given an array of non-overlapping intervals intervals where intervals[i] = [starti, endi] represent the start and the end of the ith interval and intervals is sorted in ascending order by starti. You are also given an interval newInterval = [start, end] that represents the start and end of another interval. Insert newInterval into intervals such that intervals is still sorted in ascending order by starti and intervals still does not have any overlapping intervals (merge overlapping intervals if necessary).",
    examples: [
      {
        input: "intervals = [[1,3],[6,9]], newInterval = [2,5]",
        output: "[[1,5],[6,9]]"
      },
      {
        input: "intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]",
        output: "[[1,2],[3,10],[12,16]]",
        explanation: "Because the new interval [4,8] overlaps with [3,5],[6,7],[8,10]."
      }
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public int[][] insert(int[][] intervals, int[] newInterval) {
    List<int[]> result = new ArrayList<>();
    
    // Add all intervals before newInterval
    int i = 0;
    while (i < intervals.length && intervals[i][1] < newInterval[0]) {
        result.add(intervals[i]);
        i++;
    }
    
    // Merge all overlapping intervals
    while (i < intervals.length && intervals[i][0] <= newInterval[1]) {
        newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
        newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
        i++;
    }
    
    // Add the merged interval
    result.add(newInterval);
    
    // Add all intervals after newInterval
    while (i < intervals.length) {
        result.add(intervals[i]);
        i++;
    }
    
    return result.toArray(new int[result.size()][]);
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        explanation: "We process the intervals in three parts: intervals before the new one, intervals that overlap with the new one, and intervals after the new one."
      },
      {
        approach: "Optimal",
        code: `public int[][] insert(int[][] intervals, int[] newInterval) {
    List<int[]> result = new ArrayList<>();
    
    for (int[] interval : intervals) {
        // Current interval is entirely before new interval
        if (interval[1] < newInterval[0]) {
            result.add(interval);
        }
        // Current interval is entirely after new interval
        else if (interval[0] > newInterval[1]) {
            result.add(newInterval);
            newInterval = interval;
        }
        // Intervals overlap, merge them
        else {
            newInterval[0] = Math.min(newInterval[0], interval[0]);
            newInterval[1] = Math.max(newInterval[1], interval[1]);
        }
    }
    
    result.add(newInterval);
    
    return result.toArray(new int[result.size()][]);
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        explanation: "We iterate through the intervals. For each interval, we either add it to the result, add the new interval to the result and update it to the current interval, or merge the intervals."
      }
    ],
    leetCodeUrl: "https://leetcode.com/problems/insert-interval/",
    difficulty: "Medium",
    category: "arrays"
  }
];