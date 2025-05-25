import { Question } from "../types";

export const heapQuestions: Question[] = [
  {
    id: "merge-k-sorted-lists-heap",
    title: "Merge k Sorted Lists",
    description: "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.\n\nMerge all the linked-lists into one sorted linked-list and return it.",
    difficulty: "Hard",
    tags: ["Linked List", "Divide and Conquer", "Heap (Priority Queue)", "Merge Sort"],
    examples: [
      {
        input: "lists = [[1,4,5],[1,3,4],[2,6]]",
        output: "[1,1,2,3,4,4,5,6]",
        explanation: "The linked-lists are:\n[\n  1->4->5,\n  1->3->4,\n  2->6\n]\nmerging them into one sorted list:\n1->1->2->3->4->4->5->6"
      },
      {
        input: "lists = []",
        output: "[]"
      }
    ],
    bruteForceSolution: `class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        List<Integer> values = new ArrayList<>();
        
        // Collect all values
        for (ListNode list : lists) {
            ListNode current = list;
            while (current != null) {
                values.add(current.val);
                current = current.next;
            }
        }
        
        // Sort all values
        Collections.sort(values);
        
        // Build new sorted list
        ListNode dummy = new ListNode(0);
        ListNode current = dummy;
        
        for (int val : values) {
            current.next = new ListNode(val);
            current = current.next;
        }
        
        return dummy.next;
    }
}`,
    optimalSolution: `class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        if (lists == null || lists.length == 0) return null;
        
        PriorityQueue<ListNode> heap = new PriorityQueue<>((a, b) -> a.val - b.val);
        
        // Add first node of each list to heap
        for (ListNode list : lists) {
            if (list != null) {
                heap.offer(list);
            }
        }
        
        ListNode dummy = new ListNode(0);
        ListNode current = dummy;
        
        while (!heap.isEmpty()) {
            ListNode node = heap.poll();
            current.next = node;
            current = current.next;
            
            if (node.next != null) {
                heap.offer(node.next);
            }
        }
        
        return dummy.next;
    }
}`,
    bruteForceComplexity: {
      time: "O(N log N)",
      space: "O(N)",
      reasoning: "Collect all N values, sort them, then rebuild list."
    },
    optimalComplexity: {
      time: "O(N log k)",
      space: "O(k)",
      reasoning: "Heap maintains k nodes, each of N nodes goes through heap operations."
    },
    leetcodeUrl: "https://leetcode.com/problems/merge-k-sorted-lists/"
  },
  {
    id: "top-k-frequent-elements",
    title: "Top K Frequent Elements",
    description: "Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.",
    difficulty: "Medium",
    tags: ["Array", "Hash Table", "Divide and Conquer", "Sorting", "Heap (Priority Queue)", "Bucket Sort", "Counting", "Quickselect"],
    examples: [
      {
        input: "nums = [1,1,1,2,2,3], k = 2",
        output: "[1,2]"
      },
      {
        input: "nums = [1], k = 1",
        output: "[1]"
      }
    ],
    bruteForceSolution: `class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        // Count frequencies
        Map<Integer, Integer> freqMap = new HashMap<>();
        for (int num : nums) {
            freqMap.put(num, freqMap.getOrDefault(num, 0) + 1);
        }
        
        // Convert to list and sort by frequency
        List<Map.Entry<Integer, Integer>> entries = new ArrayList<>(freqMap.entrySet());
        entries.sort((a, b) -> b.getValue() - a.getValue());
        
        // Get top k elements
        int[] result = new int[k];
        for (int i = 0; i < k; i++) {
            result[i] = entries.get(i).getKey();
        }
        
        return result;
    }
}`,
    optimalSolution: `class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        // Count frequencies
        Map<Integer, Integer> freqMap = new HashMap<>();
        for (int num : nums) {
            freqMap.put(num, freqMap.getOrDefault(num, 0) + 1);
        }
        
        // Use min heap to keep top k frequent elements
        PriorityQueue<Integer> heap = new PriorityQueue<>((a, b) -> freqMap.get(a) - freqMap.get(b));
        
        for (int num : freqMap.keySet()) {
            heap.offer(num);
            if (heap.size() > k) {
                heap.poll();
            }
        }
        
        // Extract elements from heap
        int[] result = new int[k];
        for (int i = k - 1; i >= 0; i--) {
            result[i] = heap.poll();
        }
        
        return result;
    }
}`,
    bruteForceComplexity: {
      time: "O(n log n)",
      space: "O(n)",
      reasoning: "Count frequencies then sort all entries by frequency."
    },
    optimalComplexity: {
      time: "O(n log k)",
      space: "O(n + k)",
      reasoning: "Min heap of size k, each of n unique elements may go through heap operations."
    },
    leetcodeUrl: "https://leetcode.com/problems/top-k-frequent-elements/"
  },
  {
    id: "find-median-from-data-stream",
    title: "Find Median from Data Stream",
    description: "The median is the middle value in an ordered list of numbers. If the size of the list is even, there is no middle value, and the median is the mean of the two middle values.\n\nImplement the MedianFinder class:\n\n- MedianFinder() initializes the MedianFinder object.\n- void addNum(int num) adds the integer num from the data stream to the data structure.\n- double findMedian() returns the median of all elements so far.",
    difficulty: "Hard",
    tags: ["Two Pointers", "Design", "Sorting", "Heap (Priority Queue)", "Data Stream"],
    examples: [
      {
        input: '["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"]\n[[], [1], [2], [], [3], []]',
        output: '[null, null, null, 1.5, null, 2.0]',
        explanation: 'MedianFinder medianFinder = new MedianFinder();\nmedianFinder.addNum(1);    // arr = [1]\nmedianFinder.addNum(2);    // arr = [1, 2]\nmedianFinder.findMedian(); // return 1.5 (i.e., (1 + 2) / 2)\nmedianFinder.addNum(3);    // arr[1, 2, 3]\nmedianFinder.findMedian(); // return 2.0'
      }
    ],
    bruteForceSolution: `class MedianFinder {
    private List<Integer> nums;
    
    public MedianFinder() {
        nums = new ArrayList<>();
    }
    
    public void addNum(int num) {
        nums.add(num);
        Collections.sort(nums);
    }
    
    public double findMedian() {
        int n = nums.size();
        if (n % 2 == 0) {
            return (nums.get(n / 2 - 1) + nums.get(n / 2)) / 2.0;
        } else {
            return nums.get(n / 2);
        }
    }
}`,
    optimalSolution: `class MedianFinder {
    private PriorityQueue<Integer> maxHeap; // Left half (max heap)
    private PriorityQueue<Integer> minHeap; // Right half (min heap)
    
    public MedianFinder() {
        maxHeap = new PriorityQueue<>((a, b) -> b - a); // Max heap
        minHeap = new PriorityQueue<>(); // Min heap
    }
    
    public void addNum(int num) {
        // Add to max heap first
        maxHeap.offer(num);
        
        // Balance: move largest from max heap to min heap
        minHeap.offer(maxHeap.poll());
        
        // Ensure max heap has same or one more element than min heap
        if (maxHeap.size() < minHeap.size()) {
            maxHeap.offer(minHeap.poll());
        }
    }
    
    public double findMedian() {
        if (maxHeap.size() > minHeap.size()) {
            return maxHeap.peek();
        } else {
            return (maxHeap.peek() + minHeap.peek()) / 2.0;
        }
    }
}`,
    bruteForceComplexity: {
      time: "O(n log n) for addNum, O(1) for findMedian",
      space: "O(n)",
      reasoning: "Sort entire array on each insertion."
    },
    optimalComplexity: {
      time: "O(log n) for addNum, O(1) for findMedian",
      space: "O(n)",
      reasoning: "Two heaps maintain balance, heap operations are O(log n)."
    },
    leetcodeUrl: "https://leetcode.com/problems/find-median-from-data-stream/"
  },
  {
    id: "task-scheduler",
    title: "Task Scheduler",
    description: "Given a characters array tasks, representing the tasks a CPU must do, where each letter represents a different task. Tasks could be done in any order. Each task is done in one unit of time. For each unit of time, the CPU could complete either one task or just be idle.\n\nHowever, there is a non-negative integer n that represents the cooldown period between two same tasks (the same letter in the array), that is that there must be at least n units of time between any two same tasks.\n\nReturn the least number of units of time that the CPU will take to finish all the given tasks.",
    difficulty: "Medium",
    tags: ["Array", "Hash Table", "Greedy", "Sorting", "Heap (Priority Queue)", "Counting"],
    examples: [
      {
        input: 'tasks = ["A","A","A","B","B","B"], n = 2',
        output: "8",
        explanation: 'A -> B -> idle -> A -> B -> idle -> A -> B\nThere is at least 2 units of time between any two same tasks.'
      },
      {
        input: 'tasks = ["A","A","A","B","B","B"], n = 0',
        output: "6",
        explanation: 'On this case any permutation of size 6 would work since n = 0.\n["A","A","A","B","B","B"]\n["A","B","A","B","A","B"]\n["B","B","B","A","A","A"]\n...\nAnd so on.'
      }
    ],
    bruteForceSolution: `class Solution {
    public int leastInterval(char[] tasks, int n) {
        // Count frequencies
        Map<Character, Integer> freq = new HashMap<>();
        for (char task : tasks) {
            freq.put(task, freq.getOrDefault(task, 0) + 1);
        }
        
        // Simulate the scheduling process
        List<Character> result = new ArrayList<>();
        
        while (!freq.isEmpty()) {
            List<Character> used = new ArrayList<>();
            
            // Try to schedule n+1 different tasks
            for (int i = 0; i <= n; i++) {
                if (freq.isEmpty()) break;
                
                // Find task with maximum frequency
                char maxTask = 0;
                int maxFreq = 0;
                for (Map.Entry<Character, Integer> entry : freq.entrySet()) {
                    if (entry.getValue() > maxFreq) {
                        maxFreq = entry.getValue();
                        maxTask = entry.getKey();
                    }
                }
                
                if (maxFreq > 0) {
                    result.add(maxTask);
                    used.add(maxTask);
                    freq.put(maxTask, maxFreq - 1);
                    if (freq.get(maxTask) == 0) {
                        freq.remove(maxTask);
                    }
                } else if (!freq.isEmpty()) {
                    result.add('*'); // Idle
                }
            }
        }
        
        return result.size();
    }
}`,
    optimalSolution: `class Solution {
    public int leastInterval(char[] tasks, int n) {
        // Count frequencies
        int[] freq = new int[26];
        for (char task : tasks) {
            freq[task - 'A']++;
        }
        
        // Use max heap to always process most frequent task
        PriorityQueue<Integer> heap = new PriorityQueue<>((a, b) -> b - a);
        for (int f : freq) {
            if (f > 0) {
                heap.offer(f);
            }
        }
        
        int time = 0;
        
        while (!heap.isEmpty()) {
            List<Integer> temp = new ArrayList<>();
            
            // Try to schedule n+1 tasks
            for (int i = 0; i <= n; i++) {
                if (!heap.isEmpty()) {
                    int freq_val = heap.poll();
                    if (freq_val > 1) {
                        temp.add(freq_val - 1);
                    }
                }
                time++;
                
                // If heap is empty and no tasks to add back, we're done
                if (heap.isEmpty() && temp.isEmpty()) {
                    break;
                }
            }
            
            // Add remaining tasks back to heap
            for (int f : temp) {
                heap.offer(f);
            }
        }
        
        return time;
    }
}`,
    bruteForceComplexity: {
      time: "O(n * k^2)",
      space: "O(k)",
      reasoning: "For each cycle, find maximum frequency task among k unique tasks."
    },
    optimalComplexity: {
      time: "O(n * log k)",
      space: "O(k)",
      reasoning: "Use max heap to efficiently get most frequent task, k unique tasks."
    },
    leetcodeUrl: "https://leetcode.com/problems/task-scheduler/"
  },
  {
    id: "design-twitter",
    title: "Design Twitter",
    description: "Design a simplified version of Twitter where users can post tweets, follow/unfollow another user, and is able to see the 10 most recent tweets in the user's news feed.\n\nImplement the Twitter class:\n\n- Twitter() Initializes your twitter object.\n- void postTweet(int userId, int tweetId) Composes a new tweet with ID tweetId by the user userId. Each call to this function will be made with a unique tweetId.\n- List<Integer> getNewsFeed(int userId) Retrieves the 10 most recent tweet IDs in the user's news feed. Each item in the news feed must be posted by users who the user followed or by the user themself. Tweets must be ordered from most recent to least recent.\n- void follow(int followerId, int followeeId) The user with ID followerId started following the user with ID followeeId.\n- void unfollow(int followerId, int followeeId) The user with ID followerId started unfollowing the user with ID followeeId.",
    difficulty: "Medium",
    tags: ["Hash Table", "Linked List", "Design", "Heap (Priority Queue)"],
    examples: [
      {
        input: '["Twitter", "postTweet", "getNewsFeed", "follow", "postTweet", "getNewsFeed", "unfollow", "getNewsFeed"]\n[[], [1, 5], [1], [1, 2], [2, 6], [1], [1, 2], [1]]',
        output: '[null, null, [5], null, null, [6, 5], null, [5]]',
        explanation: 'Twitter twitter = new Twitter();\ntwitter.postTweet(1, 5); // User 1 posts a new tweet (id = 5).\ntwitter.getNewsFeed(1);  // User 1\'s news feed should return a list with 1 tweet id -> [5]. return [5]\ntwitter.follow(1, 2);    // User 1 follows user 2.\ntwitter.postTweet(2, 6); // User 2 posts a new tweet (id = 6).\ntwitter.getNewsFeed(1);  // User 1\'s news feed should return a list with 2 tweet ids -> [6, 5]. Tweet id 6 should precede tweet id 5 because it is posted after tweet id 5.\ntwitter.unfollow(1, 2);  // User 1 unfollows user 2.\ntwitter.getNewsFeed(1);  // User 1\'s news feed should return a list with 1 tweet id -> [5], since user 1 is no longer following user 2.'
      }
    ],
    bruteForceSolution: `class Twitter {
    class Tweet {
        int id;
        int timestamp;
        
        public Tweet(int id, int timestamp) {
            this.id = id;
            this.timestamp = timestamp;
        }
    }
    
    private Map<Integer, List<Tweet>> userTweets;
    private Map<Integer, Set<Integer>> following;
    private int timestamp;
    
    public Twitter() {
        userTweets = new HashMap<>();
        following = new HashMap<>();
        timestamp = 0;
    }
    
    public void postTweet(int userId, int tweetId) {
        userTweets.computeIfAbsent(userId, k -> new ArrayList<>())
                  .add(new Tweet(tweetId, timestamp++));
    }
    
    public List<Integer> getNewsFeed(int userId) {
        List<Tweet> allTweets = new ArrayList<>();
        
        // Add user's own tweets
        if (userTweets.containsKey(userId)) {
            allTweets.addAll(userTweets.get(userId));
        }
        
        // Add followed users' tweets
        if (following.containsKey(userId)) {
            for (int followeeId : following.get(userId)) {
                if (userTweets.containsKey(followeeId)) {
                    allTweets.addAll(userTweets.get(followeeId));
                }
            }
        }
        
        // Sort by timestamp and get top 10
        allTweets.sort((a, b) -> b.timestamp - a.timestamp);
        
        List<Integer> result = new ArrayList<>();
        for (int i = 0; i < Math.min(10, allTweets.size()); i++) {
            result.add(allTweets.get(i).id);
        }
        
        return result;
    }
    
    public void follow(int followerId, int followeeId) {
        if (followerId != followeeId) {
            following.computeIfAbsent(followerId, k -> new HashSet<>()).add(followeeId);
        }
    }
    
    public void unfollow(int followerId, int followeeId) {
        if (following.containsKey(followerId)) {
            following.get(followerId).remove(followeeId);
        }
    }
}`,
    optimalSolution: `class Twitter {
    class Tweet {
        int id;
        int timestamp;
        Tweet next;
        
        public Tweet(int id, int timestamp) {
            this.id = id;
            this.timestamp = timestamp;
        }
    }
    
    private Map<Integer, Tweet> userTweets;
    private Map<Integer, Set<Integer>> following;
    private int timestamp;
    
    public Twitter() {
        userTweets = new HashMap<>();
        following = new HashMap<>();
        timestamp = 0;
    }
    
    public void postTweet(int userId, int tweetId) {
        Tweet newTweet = new Tweet(tweetId, timestamp++);
        newTweet.next = userTweets.get(userId);
        userTweets.put(userId, newTweet);
    }
    
    public List<Integer> getNewsFeed(int userId) {
        PriorityQueue<Tweet> heap = new PriorityQueue<>((a, b) -> b.timestamp - a.timestamp);
        
        // Add user's own tweets
        if (userTweets.containsKey(userId) && userTweets.get(userId) != null) {
            heap.offer(userTweets.get(userId));
        }
        
        // Add followed users' tweets
        if (following.containsKey(userId)) {
            for (int followeeId : following.get(userId)) {
                if (userTweets.containsKey(followeeId) && userTweets.get(followeeId) != null) {
                    heap.offer(userTweets.get(followeeId));
                }
            }
        }
        
        List<Integer> result = new ArrayList<>();
        
        while (!heap.isEmpty() && result.size() < 10) {
            Tweet tweet = heap.poll();
            result.add(tweet.id);
            
            if (tweet.next != null) {
                heap.offer(tweet.next);
            }
        }
        
        return result;
    }
    
    public void follow(int followerId, int followeeId) {
        if (followerId != followeeId) {
            following.computeIfAbsent(followerId, k -> new HashSet<>()).add(followeeId);
        }
    }
    
    public void unfollow(int followerId, int followeeId) {
        if (following.containsKey(followerId)) {
            following.get(followerId).remove(followeeId);
        }
    }
}`,
    bruteForceComplexity: {
      time: "O(n log n) for getNewsFeed, O(1) for others",
      space: "O(n)",
      reasoning: "Collect all tweets then sort them by timestamp."
    },
    optimalComplexity: {
      time: "O(k log k) for getNewsFeed where k is number of followed users, O(1) for others",
      space: "O(n)",
      reasoning: "Use min heap to merge k sorted tweet lists, each user maintains linked list of tweets."
    },
    leetcodeUrl: "https://leetcode.com/problems/design-twitter/"
  }
];
