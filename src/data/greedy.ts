import { Question } from "../types";

export const greedyQuestions: Question[] = [
  {
    id: 94,
    title: "Maximum Subarray",
    description:
      "Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.",
    examples: [
      {
        input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        output: "6",
        explanation: "[4,-1,2,1] has the largest sum = 6.",
      },
      {
        input: "nums = [1]",
        output: "1",
      },
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
        explanation:
          "We try all possible subarrays and find the one with maximum sum.",
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
        explanation:
          "We use Kadane's algorithm. At each position, we decide whether to start a new subarray or extend the existing one.",
      },
    ],
    leetCodeUrl: "https://leetcode.com/problems/maximum-subarray/",
    difficulty: "Medium",
    category: "greedy",
  },
  {
    id: 95,
    title: "Jump Game",
    description:
      "You are given an integer array nums. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length at that position. Return true if you can reach the last index, or false otherwise.",
    examples: [
      {
        input: "nums = [2,3,1,1,4]",
        output: "true",
        explanation:
          "Jump 1 step from index 0 to 1, then 3 steps to the last index.",
      },
      {
        input: "nums = [3,2,1,0,4]",
        output: "false",
        explanation:
          "You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index.",
      },
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public boolean canJump(int[] nums) {
    return canJumpFromPosition(0, nums);
}

private boolean canJumpFromPosition(int position, int[] nums) {
    if (position == nums.length - 1) {
        return true;
    }
    
    int furthestJump = Math.min(position + nums[position], nums.length - 1);
    for (int nextPosition = position + 1; 
         nextPosition <= furthestJump; nextPosition++) {
        if (canJumpFromPosition(nextPosition, nums)) {
            return true;
        }
    }
    
    return false;
}`,
        timeComplexity: "O(2^n)",
        spaceComplexity: "O(n)",
        explanation:
          "We use recursion to try all possible jumps from each position.",
      },
      {
        approach: "Optimal",
        code: `public boolean canJump(int[] nums) {
    int lastPos = nums.length - 1;
    
    for (int i = nums.length - 1; i >= 0; i--) {
        if (i + nums[i] >= lastPos) {
            lastPos = i;
        }
    }
    
    return lastPos == 0;
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        explanation:
          "We work backwards from the last index. For each position, we check if we can reach the last good position.",
      },
    ],
    leetCodeUrl: "https://leetcode.com/problems/jump-game/",
    difficulty: "Medium",
    category: "greedy",
  },
  {
    id: 96,
    title: "Gas Station",
    description:
      "There are n gas stations along a circular route, where the amount of gas at the ith station is gas[i]. You have a car with an unlimited gas tank and it costs cost[i] of gas to travel from the ith station to its next (i + 1)th station. You begin the journey with an empty tank at one of the gas stations. Given two integer arrays gas and cost, return the starting gas station's index if you can travel around the circuit once in the clockwise direction, otherwise return -1. If there exists a solution, it is guaranteed to be unique.",
    examples: [
      {
        input: "gas = [1,2,3,4,5], cost = [3,4,5,1,2]",
        output: "3",
        explanation:
          "Start at station 3 (index 3) and fill up with 4 unit of gas. Your tank = 0 + 4 = 4. Travel to station 4. Your tank = 4 - 1 + 5 = 8. Travel to station 0. Your tank = 8 - 2 + 1 = 7. Travel to station 1. Your tank = 7 - 3 + 2 = 6. Travel to station 2. Your tank = 6 - 4 + 3 = 5. Travel to station 3. The cost is 5. Your gas is just enough to travel back to station 3.",
      },
      {
        input: "gas = [2,3,4], cost = [3,4,3]",
        output: "-1",
      },
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public int canCompleteCircuit(int[] gas, int[] cost) {
    int n = gas.length;
    
    for (int start = 0; start < n; start++) {
        int tank = 0;
        boolean success = true;
        
        for (int i = 0; i < n; i++) {
            int station = (start + i) % n;
            tank += gas[station] - cost[station];
            
            if (tank < 0) {
                success = false;
                break;
            }
        }
        
        if (success) {
            return start;
        }
    }
    
    return -1;
}`,
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        explanation:
          "We try each station as starting point and simulate the journey.",
      },
      {
        approach: "Optimal",
        code: `public int canCompleteCircuit(int[] gas, int[] cost) {
    int totalSurplus = 0;
    int surplus = 0;
    int start = 0;
    
    for (int i = 0; i < gas.length; i++) {
        totalSurplus += gas[i] - cost[i];
        surplus += gas[i] - cost[i];
        
        if (surplus < 0) {
            surplus = 0;
            start = i + 1;
        }
    }
    
    return totalSurplus >= 0 ? start : -1;
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        explanation:
          "We keep track of total surplus and current surplus. If current surplus becomes negative, we start from next station.",
      },
    ],
    leetCodeUrl: "https://leetcode.com/problems/gas-station/",
    difficulty: "Medium",
    category: "greedy",
  },
  {
    id: 97,
    title: "Hand of Straights",
    description:
      "Alice has some number of cards and she wants to rearrange the cards into groups so that each group is of size groupSize, and consists of groupSize consecutive cards. Given an integer array hand where hand[i] is the value written on the ith card and an integer groupSize, return true if she can rearrange the cards, or false otherwise.",
    examples: [
      {
        input: "hand = [1,2,3,6,2,3,4,7,8], groupSize = 3",
        output: "true",
        explanation:
          "Alice's hand can be rearranged as [1,2,3],[2,3,4],[6,7,8]",
      },
      {
        input: "hand = [1,2,3,4,5], groupSize = 4",
        output: "false",
        explanation: "Alice's hand can't be rearranged into groups of 4.",
      },
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public boolean isNStraightHand(int[] hand, int groupSize) {
    if (hand.length % groupSize != 0) return false;
    
    TreeMap<Integer, Integer> count = new TreeMap<>();
    for (int card : hand) {
        count.put(card, count.getOrDefault(card, 0) + 1);
    }
    
    while (!count.isEmpty()) {
        int first = count.firstKey();
        
        for (int i = 0; i < groupSize; i++) {
            int curr = first + i;
            if (!count.containsKey(curr)) return false;
            
            count.put(curr, count.get(curr) - 1);
            if (count.get(curr) == 0) {
                count.remove(curr);
            }
        }
    }
    
    return true;
}`,
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(n)",
        explanation:
          "We use TreeMap to keep cards sorted and count their frequencies. Then we try to form groups starting from smallest card.",
      },
      {
        approach: "Optimal",
        code: `public boolean isNStraightHand(int[] hand, int groupSize) {
    if (hand.length % groupSize != 0) return false;
    
    PriorityQueue<Integer> minHeap = new PriorityQueue<>();
    Map<Integer, Integer> count = new HashMap<>();
    
    for (int card : hand) {
        count.put(card, count.getOrDefault(card, 0) + 1);
        minHeap.offer(card);
    }
    
    while (!minHeap.isEmpty()) {
        int first = minHeap.poll();
        if (count.get(first) == 0) continue;
        
        for (int i = 0; i < groupSize; i++) {
            int curr = first + i;
            if (!count.containsKey(curr) || count.get(curr) == 0) {
                return false;
            }
            count.put(curr, count.get(curr) - 1);
        }
    }
    
    return true;
}`,
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(n)",
        explanation:
          "We use a min heap to get smallest cards and a HashMap for frequencies. This is more efficient for large ranges of card values.",
      },
    ],
    leetCodeUrl: "https://leetcode.com/problems/hand-of-straights/",
    difficulty: "Medium",
    category: "greedy",
  },
  {
    id: 98,
    title: "Merge Intervals",
    description:
      "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.",
    examples: [
      {
        input: "intervals = [[1,3],[2,6],[8,10],[15,18]]",
        output: "[[1,6],[8,10],[15,18]]",
        explanation:
          "Since intervals [1,3] and [2,6] overlap, merge them into [1,6].",
      },
      {
        input: "intervals = [[1,4],[4,5]]",
        output: "[[1,5]]",
        explanation: "Intervals [1,4] and [4,5] are considered overlapping.",
      },
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public int[][] merge(int[][] intervals) {
    List<int[]> result = new ArrayList<>();
    
    for (int[] interval : intervals) {
        boolean merged = false;
        
        for (int i = 0; i < result.size(); i++) {
            int[] existing = result.get(i);
            
            if (Math.max(existing[0], interval[0]) <= 
                Math.min(existing[1], interval[1])) {
                existing[0] = Math.min(existing[0], interval[0]);
                existing[1] = Math.max(existing[1], interval[1]);
                merged = true;
                break;
            }
        }
        
        if (!merged) {
            result.add(interval);
        }
    }
    
    return result.toArray(new int[result.size()][]);
}`,
        timeComplexity: "O(n²)",
        spaceComplexity: "O(n)",
        explanation:
          "For each interval, we check if it can be merged with any existing interval in the result.",
      },
      {
        approach: "Optimal",
        code: `public int[][] merge(int[][] intervals) {
    if (intervals.length <= 1) return intervals;
    
    // Sort by start time
    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
    
    List<int[]> result = new ArrayList<>();
    int[] currentInterval = intervals[0];
    result.add(currentInterval);
    
    for (int[] interval : intervals) {
        if (interval[0] <= currentInterval[1]) {
            currentInterval[1] = Math.max(currentInterval[1], interval[1]);
        } else {
            currentInterval = interval;
            result.add(currentInterval);
        }
    }
    
    return result.toArray(new int[result.size()][]);
}`,
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(n)",
        explanation:
          "We sort intervals by start time and merge overlapping intervals in a single pass.",
      },
    ],
    leetCodeUrl: "https://leetcode.com/problems/merge-intervals/",
    difficulty: "Medium",
    category: "greedy",
  },
  {
    id: 99,
    title: "Non-overlapping Intervals",
    description:
      "Given an array of intervals intervals where intervals[i] = [starti, endi], return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.",
    examples: [
      {
        input: "intervals = [[1,2],[2,3],[3,4],[1,3]]",
        output: "1",
        explanation:
          "[1,3] can be removed and the rest of the intervals are non-overlapping.",
      },
      {
        input: "intervals = [[1,2],[1,2],[1,2]]",
        output: "2",
        explanation:
          "You need to remove two [1,2] to make the rest of the intervals non-overlapping.",
      },
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public int eraseOverlapIntervals(int[][] intervals) {
    if (intervals.length <= 1) return 0;
    
    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
    
    int count = 0;
    for (int i = 0; i < intervals.length - 1; i++) {
        int j = i + 1;
        while (j < intervals.length && intervals[i][1] > intervals[j][0]) {
            count++;
            j++;
        }
        i = j - 1;
    }
    
    return count;
}`,
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        explanation:
          "We sort intervals and count overlapping intervals by comparing each interval with all following intervals.",
      },
      {
        approach: "Optimal",
        code: `public int eraseOverlapIntervals(int[][] intervals) {
    if (intervals.length <= 1) return 0;
    
    // Sort by end time
    Arrays.sort(intervals, (a, b) -> Integer.compare(a[1], b[1]));
    
    int count = 0;
    int end = intervals[0][1];
    
    for (int i = 1; i < intervals.length; i++) {
        if (intervals[i][0] < end) {
            count++;
        } else {
            end = intervals[i][1];
        }
    }
    
    return count;
}`,
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(1)",
        explanation:
          "We sort by end time and greedily keep intervals that end earliest, removing overlapping ones.",
      },
    ],
    leetCodeUrl: "https://leetcode.com/problems/non-overlapping-intervals/",
    difficulty: "Medium",
    category: "greedy",
  },
  {
    id: 100,
    title: "Reorganize String",
    description:
      'Given a string s, rearrange the characters of s so that any two adjacent characters are not the same. Return any possible rearrangement of s or return "" if not possible.',
    examples: [
      {
        input: 's = "aab"',
        output: '"aba"',
        explanation: '"aba" is one possible answer.',
      },
      {
        input: 's = "aaab"',
        output: '""',
        explanation: "No solution exists.",
      },
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public String reorganizeString(String s) {
    Map<Character, Integer> counts = new HashMap<>();
    for (char c : s.toCharArray()) {
        counts.put(c, counts.getOrDefault(c, 0) + 1);
    }
    
    PriorityQueue<Character> maxHeap = new PriorityQueue<>(
        (a, b) -> counts.get(b) - counts.get(a)
    );
    maxHeap.addAll(counts.keySet());
    
    StringBuilder result = new StringBuilder();
    while (maxHeap.size() >= 2) {
        char char1 = maxHeap.poll();
        char char2 = maxHeap.poll();
        
        result.append(char1).append(char2);
        
        counts.put(char1, counts.get(char1) - 1);
        counts.put(char2, counts.get(char2) - 1);
        
        if (counts.get(char1) > 0) maxHeap.offer(char1);
        if (counts.get(char2) > 0) maxHeap.offer(char2);
    }
    
    if (!maxHeap.isEmpty()) {
        char last = maxHeap.poll();
        if (counts.get(last) > 1) return "";
        result.append(last);
    }
    
    return result.toString();
}`,
        timeComplexity: "O(n log k) where k is number of unique characters",
        spaceComplexity: "O(k)",
        explanation:
          "We use a max heap to always pick the two most frequent characters and arrange them alternately.",
      },
      {
        approach: "Optimal",
        code: `public String reorganizeString(String s) {
    int[] counts = new int[26];
    for (char c : s.toCharArray()) {
        counts[c - 'a']++;
    }
    
    int maxCount = 0, letter = 0;
    for (int i = 0; i < counts.length; i++) {
        if (counts[i] > maxCount) {
            maxCount = counts[i];
            letter = i;
        }
    }
    
    if (maxCount > (s.length() + 1) / 2) return "";
    
    char[] result = new char[s.length()];
    int index = 0;
    
    // Place most frequent character
    while (counts[letter] > 0) {
        result[index] = (char) (letter + 'a');
        index += 2;
        counts[letter]--;
    }
    
    // Place rest of the characters
    for (int i = 0; i < counts.length; i++) {
        while (counts[i] > 0) {
            if (index >= s.length()) {
                index = 1;
            }
            result[index] = (char) (i + 'a');
            index += 2;
            counts[i]--;
        }
    }
    
    return new String(result);
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        explanation:
          "We place the most frequent character in even positions, then fill remaining positions with other characters.",
      },
    ],
    leetCodeUrl: "https://leetcode.com/problems/reorganize-string/",
    difficulty: "Medium",
    category: "greedy",
  },
];
