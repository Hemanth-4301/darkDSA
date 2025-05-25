import { Question } from "../types";

export const binarySearchQuestions: Question[] = [
  {
    id: "binary-search",
    title: "Binary Search",
    description: "Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.\n\nYou must write an algorithm with O(log n) runtime complexity.",
    difficulty: "Easy",
    tags: ["Array", "Binary Search"],
    examples: [
      {
        input: "nums = [-1,0,3,5,9,12], target = 9",
        output: "4",
        explanation: "9 exists in nums and its index is 4"
      },
      {
        input: "nums = [-1,0,3,5,9,12], target = 2",
        output: "-1",
        explanation: "2 does not exist in nums so return -1"
      }
    ],
    bruteForceSolution: `class Solution {
    public int search(int[] nums, int target) {
        // Linear search
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] == target) {
                return i;
            }
        }
        return -1;
    }
}`,
    optimalSolution: `class Solution {
    public int search(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            
            if (nums[mid] == target) {
                return mid;
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return -1;
    }
}`,
    bruteForceComplexity: {
      time: "O(n)",
      space: "O(1)",
      reasoning: "Linear scan through entire array to find target."
    },
    optimalComplexity: {
      time: "O(log n)",
      space: "O(1)",
      reasoning: "Binary search divides search space in half at each step."
    },
    leetcodeUrl: "https://leetcode.com/problems/binary-search/"
  },
  {
    id: "search-a-2d-matrix",
    title: "Search a 2D Matrix",
    description: "Write an efficient algorithm that searches for a value target in an m x n integer matrix matrix. This matrix has the following properties:\n\n- Integers in each row are sorted from left to right.\n- The first integer of each row is greater than the last integer of the previous row.",
    difficulty: "Medium",
    tags: ["Array", "Binary Search", "Matrix"],
    examples: [
      {
        input: "matrix = [[1,4,7,11],[2,5,8,12],[3,6,9,16]], target = 5",
        output: "true"
      },
      {
        input: "matrix = [[1,4,7,11],[2,5,8,12],[3,6,9,16]], target = 13",
        output: "false"
      }
    ],
    bruteForceSolution: `class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        // Linear search through entire matrix
        for (int[] row : matrix) {
            for (int num : row) {
                if (num == target) {
                    return true;
                }
            }
        }
        return false;
    }
}`,
    optimalSolution: `class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        int m = matrix.length;
        int n = matrix[0].length;
        
        int left = 0;
        int right = m * n - 1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            int midValue = matrix[mid / n][mid % n];
            
            if (midValue == target) {
                return true;
            } else if (midValue < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return false;
    }
}`,
    bruteForceComplexity: {
      time: "O(m * n)",
      space: "O(1)",
      reasoning: "Check every element in the m x n matrix."
    },
    optimalComplexity: {
      time: "O(log(m * n))",
      space: "O(1)",
      reasoning: "Treat 2D matrix as 1D sorted array and apply binary search."
    },
    leetcodeUrl: "https://leetcode.com/problems/search-a-2d-matrix/"
  },
  {
    id: "koko-eating-bananas",
    title: "Koko Eating Bananas",
    description: "Koko loves to eat bananas. There are n piles of bananas, the ith pile has piles[i] bananas. The guards have gone and will come back in h hours.\n\nKoko can decide her bananas-per-hour eating speed of k. Each hour, she chooses some pile of bananas and eats k bananas from that pile. If the pile has less than k bananas, she eats all of them for that hour and will not eat any more bananas during that hour.\n\nKoko likes to eat slowly but wants to finish eating all the bananas before the guards come back.\n\nReturn the minimum integer k such that she can eat all the bananas within h hours.",
    difficulty: "Medium",
    tags: ["Array", "Binary Search"],
    examples: [
      {
        input: "piles = [3,6,7,11], h = 8",
        output: "4"
      },
      {
        input: "piles = [30,11,23,4,20], h = 5",
        output: "30"
      }
    ],
    bruteForceSolution: `class Solution {
    public int minEatingSpeed(int[] piles, int h) {
        // Try eating speeds from 1 to max pile size
        int maxPile = Arrays.stream(piles).max().getAsInt();
        
        for (int k = 1; k <= maxPile; k++) {
            if (canFinish(piles, h, k)) {
                return k;
            }
        }
        
        return maxPile;
    }
    
    private boolean canFinish(int[] piles, int h, int k) {
        int hours = 0;
        for (int pile : piles) {
            hours += (pile + k - 1) / k; // Ceiling division
        }
        return hours <= h;
    }
}`,
    optimalSolution: `class Solution {
    public int minEatingSpeed(int[] piles, int h) {
        int left = 1;
        int right = Arrays.stream(piles).max().getAsInt();
        
        while (left < right) {
            int mid = left + (right - left) / 2;
            
            if (canFinish(piles, h, mid)) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }
        
        return left;
    }
    
    private boolean canFinish(int[] piles, int h, int k) {
        int hours = 0;
        for (int pile : piles) {
            hours += (pile + k - 1) / k; // Ceiling division
            if (hours > h) return false; // Early termination
        }
        return true;
    }
}`,
    bruteForceComplexity: {
      time: "O(max(piles) * n)",
      space: "O(1)",
      reasoning: "Try each possible eating speed from 1 to maximum pile size."
    },
    optimalComplexity: {
      time: "O(n * log(max(piles)))",
      space: "O(1)",
      reasoning: "Binary search on eating speed, check feasibility for each candidate."
    },
    leetcodeUrl: "https://leetcode.com/problems/koko-eating-bananas/"
  },
  {
    id: "find-minimum-in-rotated-sorted-array-binary",
    title: "Find Minimum in Rotated Sorted Array",
    description: "Suppose an array of length n sorted in ascending order is rotated between 1 and n times. For example, the array nums = [0,1,2,4,5,6,7] might become:\n\n[4,5,6,7,0,1,2] if it was rotated 4 times.\n[0,1,2,4,5,6,7] if it was rotated 7 times.\n\nGiven the rotated sorted array nums of unique elements, return the minimum element of this array.\n\nYou must write an algorithm that runs in O(log n) time.",
    difficulty: "Medium",
    tags: ["Array", "Binary Search"],
    examples: [
      {
        input: "nums = [3,4,5,1,2]",
        output: "1"
      },
      {
        input: "nums = [4,5,6,7,0,1,2]",
        output: "0"
      }
    ],
    bruteForceSolution: `class Solution {
    public int findMin(int[] nums) {
        int min = nums[0];
        
        // Linear search for minimum
        for (int num : nums) {
            min = Math.min(min, num);
        }
        
        return min;
    }
}`,
    optimalSolution: `class Solution {
    public int findMin(int[] nums) {
        int left = 0;
        int right = nums.length - 1;
        
        while (left < right) {
            int mid = left + (right - left) / 2;
            
            if (nums[mid] > nums[right]) {
                // Minimum is in right half
                left = mid + 1;
            } else {
                // Minimum is in left half (including mid)
                right = mid;
            }
        }
        
        return nums[left];
    }
}`,
    bruteForceComplexity: {
      time: "O(n)",
      space: "O(1)",
      reasoning: "Linear scan through all elements to find minimum."
    },
    optimalComplexity: {
      time: "O(log n)",
      space: "O(1)",
      reasoning: "Binary search by comparing middle element with rightmost to determine search direction."
    },
    leetcodeUrl: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/"
  },
  {
    id: "search-in-rotated-sorted-array-binary",
    title: "Search in Rotated Sorted Array",
    description: "There is an integer array nums sorted in ascending order (with distinct values).\n\nPrior to being passed to your function, nums is possibly rotated at an unknown pivot index k (1 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). For example, [0,1,2,4,5,6,7] might be rotated at pivot index 3 and become [4,5,6,7,0,1,2].\n\nGiven the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.\n\nYou must write an algorithm with O(log n) runtime complexity.",
    difficulty: "Medium",
    tags: ["Array", "Binary Search"],
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
    bruteForceSolution: `class Solution {
    public int search(int[] nums, int target) {
        // Linear search
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] == target) {
                return i;
            }
        }
        return -1;
    }
}`,
    optimalSolution: `class Solution {
    public int search(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            
            if (nums[mid] == target) {
                return mid;
            }
            
            // Determine which half is sorted
            if (nums[left] <= nums[mid]) {
                // Left half is sorted
                if (target >= nums[left] && target < nums[mid]) {
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            } else {
                // Right half is sorted
                if (target > nums[mid] && target <= nums[right]) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }
        }
        
        return -1;
    }
}`,
    bruteForceComplexity: {
      time: "O(n)",
      space: "O(1)",
      reasoning: "Linear search through entire array."
    },
    optimalComplexity: {
      time: "O(log n)",
      space: "O(1)",
      reasoning: "Modified binary search determining which half is sorted at each step."
    },
    leetcodeUrl: "https://leetcode.com/problems/search-in-rotated-sorted-array/"
  },
  {
    id: "time-based-key-value-store",
    title: "Time Based Key-Value Store",
    description: "Design a time-based key-value data structure that can store multiple values for the same key at different time stamps and retrieve the key's value at a certain timestamp.\n\nImplement the TimeMap class:\n\n- TimeMap() Initializes the object of the data structure.\n- void set(String key, String value, int timestamp) Stores the key key with the value value at the given time timestamp.\n- String get(String key, int timestamp) Returns a value such that set was called previously, with timestamp_prev <= timestamp. If there are multiple such values, it returns the value associated with the largest timestamp_prev. If there are no values, it returns \"\".",
    difficulty: "Medium",
    tags: ["Hash Table", "String", "Binary Search", "Design"],
    examples: [
      {
        input: '["TimeMap", "set", "get", "get", "set", "get", "get"]\n[[], ["foo", "bar", 1], ["foo", 1], ["foo", 3], ["foo", "bar2", 4], ["foo", 4], ["foo", 5]]',
        output: '[null, null, "bar", "bar", null, "bar2", "bar2"]',
        explanation: 'TimeMap timeMap = new TimeMap();\ntimeMap.set("foo", "bar", 1);  // store the key "foo" and value "bar" along with timestamp = 1.\ntimeMap.get("foo", 1);         // return "bar"\ntimeMap.get("foo", 3);         // return "bar", since there is no value corresponding to foo at timestamp 3 and timestamp 2, then the only value is at timestamp 1 is "bar".\ntimeMap.set("foo", "bar2", 4); // store the key "foo" and value "bar2" along with timestamp = 4.\ntimeMap.get("foo", 4);         // return "bar2"\ntimeMap.get("foo", 5);         // return "bar2"'
      }
    ],
    bruteForceSolution: `class TimeMap {
    private Map<String, List<Pair<Integer, String>>> map;
    
    public TimeMap() {
        map = new HashMap<>();
    }
    
    public void set(String key, String value, int timestamp) {
        map.computeIfAbsent(key, k -> new ArrayList<>())
           .add(new Pair<>(timestamp, value));
    }
    
    public String get(String key, int timestamp) {
        if (!map.containsKey(key)) return "";
        
        List<Pair<Integer, String>> values = map.get(key);
        String result = "";
        
        // Linear search for largest timestamp <= given timestamp
        for (Pair<Integer, String> pair : values) {
            if (pair.getKey() <= timestamp) {
                result = pair.getValue();
            } else {
                break;
            }
        }
        
        return result;
    }
    
    static class Pair<K, V> {
        private K key;
        private V value;
        
        public Pair(K key, V value) {
            this.key = key;
            this.value = value;
        }
        
        public K getKey() { return key; }
        public V getValue() { return value; }
    }
}`,
    optimalSolution: `class TimeMap {
    private Map<String, List<Pair<Integer, String>>> map;
    
    public TimeMap() {
        map = new HashMap<>();
    }
    
    public void set(String key, String value, int timestamp) {
        map.computeIfAbsent(key, k -> new ArrayList<>())
           .add(new Pair<>(timestamp, value));
    }
    
    public String get(String key, int timestamp) {
        if (!map.containsKey(key)) return "";
        
        List<Pair<Integer, String>> values = map.get(key);
        int left = 0;
        int right = values.size() - 1;
        String result = "";
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (values.get(mid).getKey() <= timestamp) {
                result = values.get(mid).getValue();
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return result;
    }
    
    static class Pair<K, V> {
        private K key;
        private V value;
        
        public Pair(K key, V value) {
            this.key = key;
            this.value = value;
        }
        
        public K getKey() { return key; }
        public V getValue() { return value; }
    }
}`,
    bruteForceComplexity: {
      time: "O(1) for set, O(n) for get",
      space: "O(n)",
      reasoning: "Linear search through all timestamps for each get operation."
    },
    optimalComplexity: {
      time: "O(1) for set, O(log n) for get",
      space: "O(n)",
      reasoning: "Binary search on timestamps since they are stored in chronological order."
    },
    leetcodeUrl: "https://leetcode.com/problems/time-based-key-value-store/"
  },
  {
    id: "median-of-two-sorted-arrays",
    title: "Median of Two Sorted Arrays",
    description: "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.\n\nThe overall run time complexity should be O(log (m+n)).",
    difficulty: "Hard",
    tags: ["Array", "Binary Search", "Divide and Conquer"],
    examples: [
      {
        input: "nums1 = [1,3], nums2 = [2]",
        output: "2.00000",
        explanation: "merged array = [1,2,3] and median is 2."
      },
      {
        input: "nums1 = [1,2], nums2 = [3,4]",
        output: "2.50000",
        explanation: "merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5."
      }
    ],
    bruteForceSolution: `class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        // Merge two arrays
        List<Integer> merged = new ArrayList<>();
        int i = 0, j = 0;
        
        while (i < nums1.length && j < nums2.length) {
            if (nums1[i] <= nums2[j]) {
                merged.add(nums1[i++]);
            } else {
                merged.add(nums2[j++]);
            }
        }
        
        while (i < nums1.length) {
            merged.add(nums1[i++]);
        }
        
        while (j < nums2.length) {
            merged.add(nums2[j++]);
        }
        
        int n = merged.size();
        if (n % 2 == 1) {
            return merged.get(n / 2);
        } else {
            return (merged.get(n / 2 - 1) + merged.get(n / 2)) / 2.0;
        }
    }
}`,
    optimalSolution: `class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        if (nums1.length > nums2.length) {
            return findMedianSortedArrays(nums2, nums1);
        }
        
        int m = nums1.length;
        int n = nums2.length;
        int left = 0, right = m;
        
        while (left <= right) {
            int partitionX = (left + right) / 2;
            int partitionY = (m + n + 1) / 2 - partitionX;
            
            int maxLeftX = (partitionX == 0) ? Integer.MIN_VALUE : nums1[partitionX - 1];
            int minRightX = (partitionX == m) ? Integer.MAX_VALUE : nums1[partitionX];
            
            int maxLeftY = (partitionY == 0) ? Integer.MIN_VALUE : nums2[partitionY - 1];
            int minRightY = (partitionY == n) ? Integer.MAX_VALUE : nums2[partitionY];
            
            if (maxLeftX <= minRightY && maxLeftY <= minRightX) {
                // Found correct partition
                if ((m + n) % 2 == 0) {
                    return (Math.max(maxLeftX, maxLeftY) + Math.min(minRightX, minRightY)) / 2.0;
                } else {
                    return Math.max(maxLeftX, maxLeftY);
                }
            } else if (maxLeftX > minRightY) {
                right = partitionX - 1;
            } else {
                left = partitionX + 1;
            }
        }
        
        throw new IllegalArgumentException("Input arrays are not sorted");
    }
}`,
    bruteForceComplexity: {
      time: "O(m + n)",
      space: "O(m + n)",
      reasoning: "Merge both arrays completely to find median."
    },
    optimalComplexity: {
      time: "O(log(min(m, n)))",
      space: "O(1)",
      reasoning: "Binary search on smaller array to find correct partition point."
    },
    leetcodeUrl: "https://leetcode.com/problems/median-of-two-sorted-arrays/"
  }
];
