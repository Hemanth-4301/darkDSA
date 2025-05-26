import { Question } from '../types';

export const binarySearchQuestions: Question[] = [
  {
    id: 31,
    title: "Binary Search",
    description: "Given an array of integers nums which is sorted in ascending order, and a target integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.",
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
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1;
}`,
        timeComplexity: "O(log n)",
        spaceComplexity: "O(1)",
        explanation: "We use binary search to repeatedly divide the search interval in half."
      }
    ],
    leetCodeUrl: "https://leetcode.com/problems/binary-search/",
    difficulty: "Easy",
    category: "binarySearch"
  },
  {
    id: 32,
    title: "Search a 2D Matrix",
    description: "Write an efficient algorithm that searches for a value target in an m x n integer matrix matrix. This matrix has the following properties: Integers in each row are sorted from left to right. The first integer of each row is greater than the last integer of the previous row.",
    examples: [
      {
        input: `matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3`,
        output: "true"
      },
      {
        input: `matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13`,
        output: "false"
      }
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public boolean searchMatrix(int[][] matrix, int target) {
    int m = matrix.length;
    int n = matrix[0].length;
    
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (matrix[i][j] == target) {
                return true;
            }
        }
    }
    
    return false;
}`,
        timeComplexity: "O(m*n)",
        spaceComplexity: "O(1)",
        explanation: "We search through each element in the matrix one by one."
      },
      {
        approach: "Optimal",
        code: `public boolean searchMatrix(int[][] matrix, int target) {
    int m = matrix.length;
    int n = matrix[0].length;
    int left = 0;
    int right = m * n - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        int row = mid / n;
        int col = mid % n;
        int value = matrix[row][col];
        
        if (value == target) {
            return true;
        } else if (value < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return false;
}`,
        timeComplexity: "O(log(m*n))",
        spaceComplexity: "O(1)",
        explanation: "We treat the 2D matrix as a sorted 1D array and perform binary search. We convert the mid index back to 2D coordinates using division and modulo."
      }
    ],
    leetCodeUrl: "https://leetcode.com/problems/search-a-2d-matrix/",
    difficulty: "Medium",
    category: "binarySearch"
  },
  {
    id: 33,
    title: "Koko Eating Bananas",
    description: "Koko loves to eat bananas. There are n piles of bananas, the ith pile has piles[i] bananas. The guards have gone and will come back in h hours. Koko can decide her bananas-per-hour eating speed of k. Each hour, she chooses some pile of bananas and eats k bananas from that pile. If the pile has less than k bananas, she eats all of them instead and will not eat any more bananas during this hour. Return the minimum integer k such that she can eat all the bananas within h hours.",
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
    solutions: [
      {
        approach: "Brute Force",
        code: `public int minEatingSpeed(int[] piles, int h) {
    int maxPile = 0;
    for (int pile : piles) {
        maxPile = Math.max(maxPile, pile);
    }
    
    for (int k = 1; k <= maxPile; k++) {
        int hours = 0;
        for (int pile : piles) {
            hours += (pile + k - 1) / k;
        }
        if (hours <= h) {
            return k;
        }
    }
    
    return maxPile;
}`,
        timeComplexity: "O(n*maxPile)",
        spaceComplexity: "O(1)",
        explanation: "We try every possible eating speed from 1 to the maximum pile size."
      },
      {
        approach: "Optimal",
        code: `public int minEatingSpeed(int[] piles, int h) {
    int left = 1;
    int right = 1;
    for (int pile : piles) {
        right = Math.max(right, pile);
    }
    
    while (left < right) {
        int mid = left + (right - left) / 2;
        int hours = 0;
        
        for (int pile : piles) {
            hours += (pile + mid - 1) / mid;
        }
        
        if (hours <= h) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    
    return left;
}`,
        timeComplexity: "O(n*log(maxPile))",
        spaceComplexity: "O(1)",
        explanation: "We use binary search to find the minimum eating speed. For each speed, we calculate if Koko can eat all bananas within h hours."
      }
    ],
    leetCodeUrl: "https://leetcode.com/problems/koko-eating-bananas/",
    difficulty: "Medium",
    category: "binarySearch"
  },
  {
    id: 34,
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
        explanation: "We simply iterate through the array to find the minimum element."
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
    category: "binarySearch"
  },
  {
    id: 35,
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
        
        // Left half is sorted
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
    category: "binarySearch"
  },
  {
    id: 36,
    title: "Time Based Key-Value Store",
    description: "Design a time-based key-value data structure that can store multiple values for the same key at different time stamps and retrieve the key's value at a certain timestamp.",
    examples: [
      {
        input: `TimeMap timeMap = new TimeMap();
timeMap.set("foo", "bar", 1);
timeMap.get("foo", 1);  // return "bar"
timeMap.get("foo", 3);  // return "bar"
timeMap.set("foo", "bar2", 4);
timeMap.get("foo", 4);  // return "bar2"
timeMap.get("foo", 5);  // return "bar2"`,
        output: "[null,null,\"bar\",\"bar\",null,\"bar2\",\"bar2\"]",
        explanation: "TimeMap is initialized, then various operations are performed."
      }
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `class TimeMap {
    private Map<String, List<Pair<Integer, String>>> map;
    
    public TimeMap() {
        map = new HashMap<>();
    }
    
    public void set(String key, String value, int timestamp) {
        map.putIfAbsent(key, new ArrayList<>());
        map.get(key).add(new Pair<>(timestamp, value));
    }
    
    public String get(String key, int timestamp) {
        if (!map.containsKey(key)) return "";
        
        List<Pair<Integer, String>> values = map.get(key);
        for (int i = values.size() - 1; i >= 0; i--) {
            if (values.get(i).getKey() <= timestamp) {
                return values.get(i).getValue();
            }
        }
        
        return "";
    }
}`,
        timeComplexity: "O(n) for get, O(1) for set",
        spaceComplexity: "O(n)",
        explanation: "We store all values in a list and search linearly for the most recent value before or at the given timestamp."
      },
      {
        approach: "Optimal",
        code: `class TimeMap {
    private Map<String, TreeMap<Integer, String>> map;
    
    public TimeMap() {
        map = new HashMap<>();
    }
    
    public void set(String key, String value, int timestamp) {
        map.putIfAbsent(key, new TreeMap<>());
        map.get(key).put(timestamp, value);
    }
    
    public String get(String key, int timestamp) {
        if (!map.containsKey(key)) return "";
        
        TreeMap<Integer, String> treeMap = map.get(key);
        Integer floorKey = treeMap.floorKey(timestamp);
        return floorKey == null ? "" : treeMap.get(floorKey);
    }
}`,
        timeComplexity: "O(log n) for both get and set",
        spaceComplexity: "O(n)",
        explanation: "We use a TreeMap to store timestamps and values. The floorKey method efficiently finds the largest key less than or equal to the given timestamp."
      }
    ],
    leetCodeUrl: "https://leetcode.com/problems/time-based-key-value-store/",
    difficulty: "Medium",
    category: "binarySearch"
  },
  {
    id: 37,
    title: "Median of Two Sorted Arrays",
    description: "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).",
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
    solutions: [
      {
        approach: "Brute Force",
        code: `public double findMedianSortedArrays(int[] nums1, int[] nums2) {
    int m = nums1.length;
    int n = nums2.length;
    int[] merged = new int[m + n];
    
    int i = 0, j = 0, k = 0;
    while (i < m && j < n) {
        if (nums1[i] <= nums2[j]) {
            merged[k++] = nums1[i++];
        } else {
            merged[k++] = nums2[j++];
        }
    }
    
    while (i < m) merged[k++] = nums1[i++];
    while (j < n) merged[k++] = nums2[j++];
    
    int mid = (m + n) / 2;
    if ((m + n) % 2 == 0) {
        return (merged[mid - 1] + merged[mid]) / 2.0;
    } else {
        return merged[mid];
    }
}`,
        timeComplexity: "O(m + n)",
        spaceComplexity: "O(m + n)",
        explanation: "We merge the two sorted arrays and then find the median."
      },
      {
        approach: "Optimal",
        code: `public double findMedianSortedArrays(int[] nums1, int[] nums2) {
    if (nums1.length > nums2.length) {
        return findMedianSortedArrays(nums2, nums1);
    }
    
    int m = nums1.length;
    int n = nums2.length;
    int left = 0;
    int right = m;
    
    while (left <= right) {
        int partitionX = (left + right) / 2;
        int partitionY = (m + n + 1) / 2 - partitionX;
        
        int maxLeftX = (partitionX == 0) ? Integer.MIN_VALUE : nums1[partitionX - 1];
        int minRightX = (partitionX == m) ? Integer.MAX_VALUE : nums1[partitionX];
        
        int maxLeftY = (partitionY == 0) ? Integer.MIN_VALUE : nums2[partitionY - 1];
        int minRightY = (partitionY == n) ? Integer.MAX_VALUE : nums2[partitionY];
        
        if (maxLeftX <= minRightY && maxLeftY <= minRightX) {
            if ((m + n) % 2 == 0) {
                return (Math.max(maxLeftX, maxLeftY) + 
                        Math.min(minRightX, minRightY)) / 2.0;
            } else {
                return Math.max(maxLeftX, maxLeftY);
            }
        } else if (maxLeftX > minRightY) {
            right = partitionX - 1;
        } else {
            left = partitionX + 1;
        }
    }
    
    throw new IllegalArgumentException();
}`,
        timeComplexity: "O(log(min(m,n)))",
        spaceComplexity: "O(1)",
        explanation: "We use binary search to find the correct partition point in the smaller array that divides both arrays into left and right parts of equal size, where all elements on the left are smaller than all elements on the right."
      }
    ],
    leetCodeUrl: "https://leetcode.com/problems/median-of-two-sorted-arrays/",
    difficulty: "Hard",
    category: "binarySearch"
  }
];