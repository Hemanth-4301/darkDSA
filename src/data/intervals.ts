import { Question } from "../types";

export const intervalsQuestions: Question[] = [
  {
    id: 101,
    title: "Insert Interval",
    description:
      "You are given an array of non-overlapping intervals intervals where intervals[i] = [starti, endi] represent the start and the end of the ith interval and intervals is sorted in ascending order by starti. You are also given an interval newInterval = [start, end] that represents the start and end of another interval. Insert newInterval into intervals such that intervals is still sorted in ascending order by starti and intervals still does not have any overlapping intervals (merge overlapping intervals if necessary).",
    examples: [
      {
        input: "intervals = [[1,3],[6,9]], newInterval = [2,5]",
        output: "[[1,5],[6,9]]",
      },
      {
        input:
          "intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]",
        output: "[[1,2],[3,10],[12,16]]",
        explanation:
          "Because the new interval [4,8] overlaps with [3,5],[6,7],[8,10].",
      },
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
    
    // Merge overlapping intervals
    while (i < intervals.length && intervals[i][0] <= newInterval[1]) {
        newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
        newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
        i++;
    }
    result.add(newInterval);
    
    // Add remaining intervals
    while (i < intervals.length) {
        result.add(intervals[i]);
        i++;
    }
    
    return result.toArray(new int[result.size()][]);
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        explanation:
          "We process intervals in three parts: before new interval, overlapping intervals, and after new interval.",
      },
      {
        approach: "Optimal",
        code: `public int[][] insert(int[][] intervals, int[] newInterval) {
    List<int[]> result = new ArrayList<>();
    
    for (int[] interval : intervals) {
        if (interval[1] < newInterval[0]) {
            result.add(interval);
        } else if (newInterval[1] < interval[0]) {
            result.add(newInterval);
            newInterval = interval;
        } else {
            newInterval[0] = Math.min(newInterval[0], interval[0]);
            newInterval[1] = Math.max(newInterval[1], interval[1]);
        }
    }
    result.add(newInterval);
    
    return result.toArray(new int[result.size()][]);
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        explanation:
          "We handle each interval in a single pass, either adding it to result, merging it with new interval, or adding new interval and updating it.",
      },
    ],
    leetCodeUrl: "https://leetcode.com/problems/insert-interval/",
    difficulty: "Medium",
    category: "intervals",
  },
  {
    id: 102,
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
    category: "intervals",
  },
  {
    id: 103,
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
    category: "intervals",
  },
  {
    id: 104,
    title: "Meeting Rooms",
    description:
      "Given an array of meeting time intervals where intervals[i] = [starti, endi], determine if a person could attend all meetings.",
    examples: [
      {
        input: "intervals = [[0,30],[5,10],[15,20]]",
        output: "false",
        explanation:
          "The person cannot attend all meetings as there are overlaps.",
      },
      {
        input: "intervals = [[7,10],[2,4]]",
        output: "true",
        explanation:
          "The person can attend all meetings as there are no overlaps.",
      },
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public boolean canAttendMeetings(int[][] intervals) {
    for (int i = 0; i < intervals.length; i++) {
        for (int j = i + 1; j < intervals.length; j++) {
            if (overlap(intervals[i], intervals[j])) {
                return false;
            }
        }
    }
    return true;
}

private boolean overlap(int[] i1, int[] i2) {
    return Math.max(i1[0], i2[0]) < Math.min(i1[1], i2[1]);
}`,
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        explanation: "We check each pair of intervals for overlap.",
      },
      {
        approach: "Optimal",
        code: `public boolean canAttendMeetings(int[][] intervals) {
    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
    
    for (int i = 1; i < intervals.length; i++) {
        if (intervals[i][0] < intervals[i-1][1]) {
            return false;
        }
    }
    
    return true;
}`,
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(1)",
        explanation:
          "We sort intervals by start time and check if any adjacent intervals overlap.",
      },
    ],
    leetCodeUrl: "https://leetcode.com/problems/meeting-rooms/",
    difficulty: "Easy",
    category: "intervals",
  },
  {
    id: 105,
    title: "Meeting Rooms II",
    description:
      "Given an array of meeting time intervals intervals where intervals[i] = [starti, endi], return the minimum number of conference rooms required.",
    examples: [
      {
        input: "intervals = [[0,30],[5,10],[15,20]]",
        output: "2",
        explanation:
          "We need at least 2 conference rooms to hold all meetings.",
      },
      {
        input: "intervals = [[7,10],[2,4]]",
        output: "1",
        explanation: "One conference room is sufficient.",
      },
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public int minMeetingRooms(int[][] intervals) {
    int n = intervals.length;
    int[] start = new int[n];
    int[] end = new int[n];
    
    for (int i = 0; i < n; i++) {
        start[i] = intervals[i][0];
        end[i] = intervals[i][1];
    }
    
    Arrays.sort(start);
    Arrays.sort(end);
    
    int rooms = 0;
    int maxRooms = 0;
    int s = 0, e = 0;
    
    while (s < n) {
        if (start[s] < end[e]) {
            rooms++;
            s++;
        } else {
            rooms--;
            e++;
        }
        maxRooms = Math.max(maxRooms, rooms);
    }
    
    return maxRooms;
}`,
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(n)",
        explanation:
          "We separate start and end times, sort them, and count overlapping meetings.",
      },
      {
        approach: "Optimal",
        code: `public int minMeetingRooms(int[][] intervals) {
    PriorityQueue<Integer> heap = new PriorityQueue<>();
    
    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
    
    heap.offer(intervals[0][1]);
    
    for (int i = 1; i < intervals.length; i++) {
        if (intervals[i][0] >= heap.peek()) {
            heap.poll();
        }
        heap.offer(intervals[i][1]);
    }
    
    return heap.size();
}`,
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(n)",
        explanation:
          "We use a min heap to track end times of meetings. Each time we can reuse a room, we remove the earliest ending time.",
      },
    ],
    leetCodeUrl: "https://leetcode.com/problems/meeting-rooms-ii/",
    difficulty: "Medium",
    category: "intervals",
  },
];
