import { Question } from "../types";

export const heapQuestions: Question[] = [
  {
    id: 61,
    title: "Merge k Sorted Lists",
    description:
      "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.",
    examples: [
      {
        input: "lists = [[1,4,5],[1,3,4],[2,6]]",
        output: "[1,1,2,3,4,4,5,6]",
        explanation: "The linked-lists are merged into one sorted list.",
      },
      {
        input: "lists = []",
        output: "[]",
      },
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public ListNode mergeKLists(ListNode[] lists) {
    List<Integer> values = new ArrayList<>();
    
    for (ListNode list : lists) {
        ListNode current = list;
        while (current != null) {
            values.add(current.val);
            current = current.next;
        }
    }
    
    Collections.sort(values);
    
    ListNode dummy = new ListNode(0);
    ListNode current = dummy;
    for (int val : values) {
        current.next = new ListNode(val);
        current = current.next;
    }
    
    return dummy.next;
}`,
        timeComplexity: "O(N log N) where N is total number of nodes",
        spaceComplexity: "O(N)",
        explanation:
          "We collect all values in an array, sort them, and create a new linked list.",
      },
      {
        approach: "Optimal",
        code: `public ListNode mergeKLists(ListNode[] lists) {
    if (lists == null || lists.length == 0) return null;
    
    PriorityQueue<ListNode> queue = new PriorityQueue<>((a, b) -> a.val - b.val);
    
    // Add first node from each list
    for (ListNode list : lists) {
        if (list != null) {
            queue.offer(list);
        }
    }
    
    ListNode dummy = new ListNode(0);
    ListNode tail = dummy;
    
    while (!queue.isEmpty()) {
        ListNode node = queue.poll();
        tail.next = node;
        tail = tail.next;
        
        if (node.next != null) {
            queue.offer(node.next);
        }
    }
    
    return dummy.next;
}`,
        timeComplexity: "O(N log k) where k is number of lists",
        spaceComplexity: "O(k)",
        explanation:
          "We use a min heap to always get the smallest value among the current nodes from each list.",
      },
    ],
    leetCodeUrl: "https://leetcode.com/problems/merge-k-sorted-lists/",
    difficulty: "Hard",
    category: "heap",
  },
  {
    id: 62,
    title: "Top K Frequent Elements",
    description:
      "Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.",
    examples: [
      {
        input: "nums = [1,1,1,2,2,3], k = 2",
        output: "[1,2]",
      },
      {
        input: "nums = [1], k = 1",
        output: "[1]",
      },
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public int[] topKFrequent(int[] nums, int k) {
    Map<Integer, Integer> count = new HashMap<>();
    for (int num : nums) {
        count.put(num, count.getOrDefault(num, 0) + 1);
    }
    
    List<Map.Entry<Integer, Integer>> entries = new ArrayList<>(count.entrySet());
    entries.sort((a, b) -> b.getValue() - a.getValue());
    
    int[] result = new int[k];
    for (int i = 0; i < k; i++) {
        result[i] = entries.get(i).getKey();
    }
    
    return result;
}`,
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(n)",
        explanation:
          "We count frequencies using a HashMap, sort by frequency, and take the top k elements.",
      },
      {
        approach: "Optimal",
        code: `public int[] topKFrequent(int[] nums, int k) {
    Map<Integer, Integer> count = new HashMap<>();
    for (int num : nums) {
        count.put(num, count.getOrDefault(num, 0) + 1);
    }
    
    PriorityQueue<Integer> heap = new PriorityQueue<>(
        (a, b) -> count.get(a) - count.get(b)
    );
    
    for (int num : count.keySet()) {
        heap.offer(num);
        if (heap.size() > k) {
            heap.poll();
        }
    }
    
    int[] result = new int[k];
    for (int i = k - 1; i >= 0; i--) {
        result[i] = heap.poll();
    }
    
    return result;
}`,
        timeComplexity: "O(n log k)",
        spaceComplexity: "O(n)",
        explanation:
          "We use a min heap of size k to maintain the k most frequent elements. When we process a new element, we remove the least frequent element if heap size exceeds k.",
      },
    ],
    leetCodeUrl: "https://leetcode.com/problems/top-k-frequent-elements/",
    difficulty: "Medium",
    category: "heap",
  },
  {
    id: 63,
    title: "Find Median from Data Stream",
    description:
      "The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value and the median is the mean of the two middle values. Design a data structure that supports adding integers to the stream and calculating the median.",
    examples: [
      {
        input: `["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"]
[[], [1], [2], [], [3], []]`,
        output: "[null, null, null, 1.5, null, 2.0]",
        explanation:
          "MedianFinder medianFinder = new MedianFinder();\nmedianFinder.addNum(1);    // arr = [1]\nmedianFinder.addNum(2);    // arr = [1, 2]\nmedianFinder.findMedian(); // return 1.5 (i.e., (1 + 2) / 2)\nmedianFinder.addNum(3);    // arr[1, 2, 3]\nmedianFinder.findMedian(); // return 2.0",
      },
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `class MedianFinder {
    private List<Integer> numbers;
    
    public MedianFinder() {
        numbers = new ArrayList<>();
    }
    
    public void addNum(int num) {
        numbers.add(num);
        Collections.sort(numbers);
    }
    
    public double findMedian() {
        int n = numbers.size();
        if (n % 2 == 0) {
            return (numbers.get(n/2 - 1) + numbers.get(n/2)) / 2.0;
        } else {
            return numbers.get(n/2);
        }
    }
}`,
        timeComplexity: "O(n log n) for addNum, O(1) for findMedian",
        spaceComplexity: "O(n)",
        explanation:
          "We maintain a sorted list of numbers. When adding a number, we sort the entire list.",
      },
      {
        approach: "Optimal",
        code: `class MedianFinder {
    private PriorityQueue<Integer> small;  // max heap
    private PriorityQueue<Integer> large;  // min heap
    
    public MedianFinder() {
        small = new PriorityQueue<>((a, b) -> b - a);
        large = new PriorityQueue<>();
    }
    
    public void addNum(int num) {
        small.offer(num);
        large.offer(small.poll());
        
        if (small.size() < large.size()) {
            small.offer(large.poll());
        }
    }
    
    public double findMedian() {
        if (small.size() > large.size()) {
            return small.peek();
        } else {
            return (small.peek() + large.peek()) / 2.0;
        }
    }
}`,
        timeComplexity: "O(log n) for addNum, O(1) for findMedian",
        spaceComplexity: "O(n)",
        explanation:
          "We use two heaps: a max heap for the smaller half and a min heap for the larger half. We maintain the heaps such that their sizes differ by at most 1.",
      },
    ],
    leetCodeUrl: "https://leetcode.com/problems/find-median-from-data-stream/",
    difficulty: "Hard",
    category: "heap",
  },
  {
    id: 64,
    title: "Task Scheduler",
    description:
      "Given a characters array tasks, representing the tasks a CPU needs to do, where each letter represents a different task. Tasks could be done in any order. Each task is done in one unit of time. For each unit of time, the CPU could complete either one task or just be idle. However, there is a non-negative integer n that represents the cooldown period between two same tasks (the same letter in the array), that is that there must be at least n units of time between any two same tasks. Return the least number of units of times that the CPU will take to finish all the given tasks.",
    examples: [
      {
        input: 'tasks = ["A","A","A","B","B","B"], n = 2',
        output: "8",
        explanation: "A -> B -> idle -> A -> B -> idle -> A -> B",
      },
      {
        input: 'tasks = ["A","A","A","B","B","B"], n = 0',
        output: "6",
        explanation: "Any permutation of size 6 would work since n = 0.",
      },
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public int leastInterval(char[] tasks, int n) {
    int[] frequencies = new int[26];
    for (char task : tasks) {
        frequencies[task - 'A']++;
    }
    
    Arrays.sort(frequencies);
    int maxFreq = frequencies[25];
    int idleTime = (maxFreq - 1) * n;
    
    for (int i = 24; i >= 0 && frequencies[i] > 0; i--) {
        idleTime -= Math.min(maxFreq - 1, frequencies[i]);
    }
    
    return idleTime > 0 ? tasks.length + idleTime : tasks.length;
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        explanation:
          "We count frequencies of tasks and calculate idle time based on the most frequent task.",
      },
      {
        approach: "Optimal",
        code: `public int leastInterval(char[] tasks, int n) {
    Map<Character, Integer> count = new HashMap<>();
    for (char task : tasks) {
        count.put(task, count.getOrDefault(task, 0) + 1);
    }
    
    PriorityQueue<Integer> maxHeap = new PriorityQueue<>((a, b) -> b - a);
    maxHeap.addAll(count.values());
    
    int cycles = 0;
    while (!maxHeap.isEmpty()) {
        List<Integer> temp = new ArrayList<>();
        for (int i = 0; i <= n; i++) {
            if (!maxHeap.isEmpty()) {
                temp.add(maxHeap.poll());
            }
        }
        
        for (int freq : temp) {
            if (--freq > 0) {
                maxHeap.offer(freq);
            }
        }
        
        cycles += maxHeap.isEmpty() ? temp.size() : n + 1;
    
    }
    
    return cycles;
}`,
        timeComplexity: "O(n log 26)",
        spaceComplexity: "O(1)",
        explanation:
          "We use a max heap to always process the most frequent tasks first. We simulate the scheduling process by processing n+1 tasks in each cycle.",
      },
    ],
    leetCodeUrl: "https://leetcode.com/problems/task-scheduler/",
    difficulty: "Medium",
    category: "heap",
  },
  {
    id: 65,
    title: "Design Twitter",
    description:
      "Design a simplified version of Twitter where users can post tweets, follow/unfollow another user, and is able to see the 10 most recent tweets in the user's news feed.",
    examples: [
      {
        input: `["Twitter", "postTweet", "getNewsFeed", "follow", "postTweet", "getNewsFeed", "unfollow", "getNewsFeed"]
[[], [1, 5], [1], [1, 2], [2, 6], [1], [1, 2], [1]]`,
        output: "[null, null, [5], null, null, [6, 5], null, [5]]",
        explanation:
          "Twitter twitter = new Twitter();\ntwitter.postTweet(1, 5); // User 1 posts a new tweet (id = 5).\ntwitter.getNewsFeed(1);  // User 1's news feed should return a list with 1 tweet id -> [5].\ntwitter.follow(1, 2);    // User 1 follows user 2.\ntwitter.postTweet(2, 6); // User 2 posts a new tweet (id = 6).\ntwitter.getNewsFeed(1);  // User 1's news feed should return a list with 2 tweet ids -> [6, 5].\ntwitter.unfollow(1, 2);  // User 1 unfollows user 2.\ntwitter.getNewsFeed(1);  // User 1's news feed should return a list with 1 tweet id -> [5].",
      },
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `class Twitter {
    private class Tweet {
        int id;
        int timestamp;
        
        Tweet(int id, int timestamp) {
            this.id = id;
            this.timestamp = timestamp;
        }
    }
    
    private Map<Integer, List<Tweet>> tweets;
    private Map<Integer, Set<Integer>> follows;
    private int timestamp;
    
    public Twitter() {
        tweets = new HashMap<>();
        follows = new HashMap<>();
        timestamp = 0;
    }
    
    public void postTweet(int userId, int tweetId) {
        tweets.putIfAbsent(userId, new ArrayList<>());
        tweets.get(userId).add(new Tweet(tweetId, timestamp++));
    }
    
    public List<Integer> getNewsFeed(int userId) {
        List<Tweet> allTweets = new ArrayList<>();
        
        // Add user's own tweets
        if (tweets.containsKey(userId)) {
            allTweets.addAll(tweets.get(userId));
        }
        
        // Add tweets from followed users
        if (follows.containsKey(userId)) {
            for (int followeeId : follows.get(userId)) {
                if (tweets.containsKey(followeeId)) {
                    allTweets.addAll(tweets.get(followeeId));
                }
            }
        }
        
        allTweets.sort((a, b) -> b.timestamp - a.timestamp);
        
        List<Integer> feed = new ArrayList<>();
        for (int i = 0; i < Math.min(10, allTweets.size()); i++) {
            feed.add(allTweets.get(i).id);
        }
        
        return feed;
    }
    
    public void follow(int followerId, int followeeId) {
        follows.putIfAbsent(followerId, new HashSet<>());
        follows.get(followerId).add(followeeId);
    }
    
    public void unfollow(int followerId, int followeeId) {
        if (follows.containsKey(followerId)) {
            follows.get(followerId).remove(followeeId);
        }
    }
}`,
        timeComplexity: "O(n log n) for getNewsFeed, O(1) for others",
        spaceComplexity: "O(n)",
        explanation:
          "We store tweets and follows in HashMaps. For news feed, we collect all relevant tweets and sort them by timestamp.",
      },
      {
        approach: "Optimal",
        code: `class Twitter {
    private class Tweet {
        int id;
        int timestamp;
        Tweet next;
        
        Tweet(int id, int timestamp) {
            this.id = id;
            this.timestamp = timestamp;
        }
    }
    
    private Map<Integer, Tweet> tweets;  // userId -> head of tweet list
    private Map<Integer, Set<Integer>> follows;
    private int timestamp;
    
    public Twitter() {
        tweets = new HashMap<>();
        follows = new HashMap<>();
        timestamp = 0;
    }
    
    public void postTweet(int userId, int tweetId) {
        Tweet tweet = new Tweet(tweetId, timestamp++);
        tweet.next = tweets.get(userId);
        tweets.put(userId, tweet);
    }
    
    public List<Integer> getNewsFeed(int userId) {
        PriorityQueue<Tweet> maxHeap = new PriorityQueue<>(
            (a, b) -> b.timestamp - a.timestamp
        );
        
        // Add user's own tweets
        if (tweets.containsKey(userId)) {
            maxHeap.offer(tweets.get(userId));
        }
        
        // Add tweets from followed users
        if (follows.containsKey(userId)) {
            for (int followeeId : follows.get(userId)) {
                if (tweets.containsKey(followeeId)) {
                    maxHeap.offer(tweets.get(followeeId));
                }
            }
        }
        
        List<Integer> feed = new ArrayList<>();
        while (!maxHeap.isEmpty() && feed.size() < 10) {
            Tweet tweet = maxHeap.poll();
            feed.add(tweet.id);
            if (tweet.next != null) {
                maxHeap.offer(tweet.next);
            }
        }
        
        return feed;
    }
    
    public void follow(int followerId, int followeeId) {
        follows.putIfAbsent(followerId, new HashSet<>());
        follows.get(followerId).add(followeeId);
    }
    
    public void unfollow(int followerId, int followeeId) {
        if (follows.containsKey(followerId)) {
            follows.get(followerId).remove(followeeId);
        }
    }
}`,
        timeComplexity:
          "O(k log k) for getNewsFeed where k is number of followed users",
        spaceComplexity: "O(n)",
        explanation:
          "We use a linked list to store tweets and a max heap to merge tweets from different users. This avoids sorting all tweets.",
      },
    ],
    leetCodeUrl: "https://leetcode.com/problems/design-twitter/",
    difficulty: "Medium",
    category: "heap",
  },
];
