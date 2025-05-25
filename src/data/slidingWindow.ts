import { Question } from '../types';

export const slidingWindowQuestions: Question[] = [
  {
    id: 18,
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
    category: "slidingWindow"
  },
  {
    id: 19,
    title: "Longest Substring Without Repeating Characters",
    description: "Given a string s, find the length of the longest substring without repeating characters.",
    examples: [
      {
        input: "s = \"abcabcbb\"",
        output: "3",
        explanation: "The answer is \"abc\", with the length of 3."
      },
      {
        input: "s = \"bbbbb\"",
        output: "1",
        explanation: "The answer is \"b\", with the length of 1."
      }
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public int lengthOfLongestSubstring(String s) {
    int maxLength = 0;
    
    for (int i = 0; i < s.length(); i++) {
        Set<Character> charSet = new HashSet<>();
        
        for (int j = i; j < s.length(); j++) {
            if (charSet.contains(s.charAt(j))) {
                break;
            }
            
            charSet.add(s.charAt(j));
            maxLength = Math.max(maxLength, j - i + 1);
        }
    }
    
    return maxLength;
}`,
        timeComplexity: "O(n²)",
        spaceComplexity: "O(min(m, n))",
        explanation: "We check all possible substrings to find the longest one without repeating characters."
      },
      {
        approach: "Optimal",
        code: `public int lengthOfLongestSubstring(String s) {
    int maxLength = 0;
    Map<Character, Integer> charMap = new HashMap<>();
    
    for (int right = 0, left = 0; right < s.length(); right++) {
        char c = s.charAt(right);
        
        if (charMap.containsKey(c)) {
            left = Math.max(left, charMap.get(c) + 1);
        }
        
        charMap.put(c, right);
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(min(m, n))",
        explanation: "We use a sliding window approach with a HashMap to track the most recent position of each character. When we encounter a repeated character, we move the left pointer of our window to the position after the previous occurrence of that character."
      }
    ],
    leetCodeUrl: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
    difficulty: "Medium",
    category: "slidingWindow"
  },
  {
    id: 20,
    title: "Longest Repeating Character Replacement",
    description: "You are given a string s and an integer k. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most k times. Return the length of the longest substring containing the same letter you can get after performing the above operations.",
    examples: [
      {
        input: "s = \"ABAB\", k = 2",
        output: "4",
        explanation: "Replace the two 'A's with two 'B's or vice versa."
      },
      {
        input: "s = \"AABABBA\", k = 1",
        output: "4",
        explanation: "Replace the one 'A' in the middle with 'B' and form \"AABBBBA\". The substring \"BBBB\" has the longest repeating letters, which is 4."
      }
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public int characterReplacement(String s, int k) {
    int maxLength = 0;
    
    for (int i = 0; i < s.length(); i++) {
        for (int j = i; j < s.length(); j++) {
            int[] count = new int[26];
            for (int l = i; l <= j; l++) {
                count[s.charAt(l) - 'A']++;
            }
            
            int maxCount = 0;
            for (int c : count) {
                maxCount = Math.max(maxCount, c);
            }
            
            if (j - i + 1 - maxCount <= k) {
                maxLength = Math.max(maxLength, j - i + 1);
            }
        }
    }
    
    return maxLength;
}`,
        timeComplexity: "O(n³)",
        spaceComplexity: "O(1)",
        explanation: "We check all possible substrings. For each substring, we count the frequency of each character and check if we can make all characters the same using at most k replacements."
      },
      {
        approach: "Optimal",
        code: `public int characterReplacement(String s, int k) {
    int maxLength = 0;
    int[] count = new int[26];
    int maxCount = 0;
    
    for (int right = 0, left = 0; right < s.length(); right++) {
        count[s.charAt(right) - 'A']++;
        maxCount = Math.max(maxCount, count[s.charAt(right) - 'A']);
        
        if (right - left + 1 - maxCount > k) {
            count[s.charAt(left) - 'A']--;
            left++;
        }
        
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        explanation: "We use a sliding window approach. For each window, we calculate the maximum frequency of any character. If the window length minus the maximum frequency is greater than k, it means we need to make more than k replacements, so we shrink the window."
      }
    ],
    leetCodeUrl: "https://leetcode.com/problems/longest-repeating-character-replacement/",
    difficulty: "Medium",
    category: "slidingWindow"
  },
  {
    id: 21,
    title: "Permutation in String",
    description: "Given two strings s1 and s2, return true if s2 contains a permutation of s1, or false otherwise. In other words, return true if one of s1's permutations is the substring of s2.",
    examples: [
      {
        input: "s1 = \"ab\", s2 = \"eidbaooo\"",
        output: "true",
        explanation: "s2 contains one permutation of s1 (\"ba\")."
      },
      {
        input: "s1 = \"ab\", s2 = \"eidboaoo\"",
        output: "false"
      }
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public boolean checkInclusion(String s1, String s2) {
    if (s1.length() > s2.length()) {
        return false;
    }
    
    // Count frequency of characters in s1
    int[] s1Count = new int[26];
    for (char c : s1.toCharArray()) {
        s1Count[c - 'a']++;
    }
    
    for (int i = 0; i <= s2.length() - s1.length(); i++) {
        int[] windowCount = new int[26];
        
        // Count frequency of characters in the current window
        for (int j = 0; j < s1.length(); j++) {
            windowCount[s2.charAt(i + j) - 'a']++;
        }
        
        // Check if the frequencies match
        if (matches(s1Count, windowCount)) {
            return true;
        }
    }
    
    return false;
}

private boolean matches(int[] count1, int[] count2) {
    for (int i = 0; i < 26; i++) {
        if (count1[i] != count2[i]) {
            return false;
        }
    }
    return true;
}`,
        timeComplexity: "O(l1 + (l2 - l1) * l1)",
        spaceComplexity: "O(1)",
        explanation: "We count the frequency of characters in s1. Then, for each possible window of s2 with the same length as s1, we count the frequency of characters and check if it matches s1's frequency."
      },
      {
        approach: "Optimal",
        code: `public boolean checkInclusion(String s1, String s2) {
    if (s1.length() > s2.length()) {
        return false;
    }
    
    int[] s1Count = new int[26];
    int[] s2Count = new int[26];
    
    // Count frequency of characters in s1
    for (char c : s1.toCharArray()) {
        s1Count[c - 'a']++;
    }
    
    // Initialize sliding window
    for (int i = 0; i < s1.length(); i++) {
        s2Count[s2.charAt(i) - 'a']++;
    }
    
    // Check if the initial window is a permutation
    if (matches(s1Count, s2Count)) {
        return true;
    }
    
    // Slide the window
    for (int i = s1.length(); i < s2.length(); i++) {
        s2Count[s2.charAt(i) - 'a']++;
        s2Count[s2.charAt(i - s1.length()) - 'a']--;
        
        if (matches(s1Count, s2Count)) {
            return true;
        }
    }
    
    return false;
}

private boolean matches(int[] count1, int[] count2) {
    for (int i = 0; i < 26; i++) {
        if (count1[i] != count2[i]) {
            return false;
        }
    }
    return true;
}`,
        timeComplexity: "O(l1 + l2)",
        spaceComplexity: "O(1)",
        explanation: "We use a sliding window approach with two frequency arrays. We initialize the window to the length of s1 and then slide it through s2, updating the frequency array with each move."
      }
    ],
    leetCodeUrl: "https://leetcode.com/problems/permutation-in-string/",
    difficulty: "Medium",
    category: "slidingWindow"
  },
  {
    id: 22,
    title: "Minimum Window Substring",
    description: "Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string \"\".",
    examples: [
      {
        input: "s = \"ADOBECODEBANC\", t = \"ABC\"",
        output: "\"BANC\"",
        explanation: "The minimum window substring \"BANC\" includes 'A', 'B', and 'C' from string t."
      },
      {
        input: "s = \"a\", t = \"a\"",
        output: "\"a\"",
        explanation: "The entire string s is the minimum window."
      }
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public String minWindow(String s, String t) {
    if (s.length() < t.length()) {
        return "";
    }
    
    Map<Character, Integer> targetMap = new HashMap<>();
    for (char c : t.toCharArray()) {
        targetMap.put(c, targetMap.getOrDefault(c, 0) + 1);
    }
    
    String result = "";
    int minLength = Integer.MAX_VALUE;
    
    for (int i = 0; i < s.length(); i++) {
        for (int j = i; j < s.length(); j++) {
            String window = s.substring(i, j + 1);
            
            if (containsAll(window, targetMap) && window.length() < minLength) {
                minLength = window.length();
                result = window;
            }
        }
    }
    
    return result;
}

private boolean containsAll(String window, Map<Character, Integer> targetMap) {
    Map<Character, Integer> windowMap = new HashMap<>();
    for (char c : window.toCharArray()) {
        windowMap.put(c, windowMap.getOrDefault(c, 0) + 1);
    }
    
    for (Map.Entry<Character, Integer> entry : targetMap.entrySet()) {
        char c = entry.getKey();
        int count = entry.getValue();
        
        if (!windowMap.containsKey(c) || windowMap.get(c) < count) {
            return false;
        }
    }
    
    return true;
}`,
        timeComplexity: "O(n³)",
        spaceComplexity: "O(k)",
        explanation: "We check all possible substrings of s. For each substring, we check if it contains all characters from t with the required frequency."
      },
      {
        approach: "Optimal",
        code: `public String minWindow(String s, String t) {
    if (s.length() < t.length()) {
        return "";
    }
    
    Map<Character, Integer> targetMap = new HashMap<>();
    for (char c : t.toCharArray()) {
        targetMap.put(c, targetMap.getOrDefault(c, 0) + 1);
    }
    
    int required = targetMap.size();
    int formed = 0;
    int[] ans = {-1, 0, 0}; // length, left, right
    
    Map<Character, Integer> windowMap = new HashMap<>();
    
    for (int right = 0, left = 0; right < s.length(); right++) {
        char c = s.charAt(right);
        windowMap.put(c, windowMap.getOrDefault(c, 0) + 1);
        
        if (targetMap.containsKey(c) && windowMap.get(c).intValue() == targetMap.get(c).intValue()) {
            formed++;
        }
        
        while (left <= right && formed == required) {
            c = s.charAt(left);
            
            // Update result if current window is smaller
            if (ans[0] == -1 || right - left + 1 < ans[0]) {
                ans[0] = right - left + 1;
                ans[1] = left;
                ans[2] = right;
            }
            
            // Remove leftmost character
            windowMap.put(c, windowMap.get(c) - 1);
            
            if (targetMap.containsKey(c) && windowMap.get(c) < targetMap.get(c)) {
                formed--;
            }
            
            left++;
        }
    }
    
    return ans[0] == -1 ? "" : s.substring(ans[1], ans[2] + 1);
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(k)",
        explanation: "We use a sliding window approach with two pointers. We expand the window until it contains all characters from t, then contract it from the left to find the minimum valid window."
      }
    ],
    leetCodeUrl: "https://leetcode.com/problems/minimum-window-substring/",
    difficulty: "Hard",
    category: "slidingWindow"
  },
  {
    id: 23,
    title: "Sliding Window Maximum",
    description: "You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position. Return the max sliding window.",
    examples: [
      {
        input: "nums = [1,3,-1,-3,5,3,6,7], k = 3",
        output: "[3,3,5,5,6,7]",
        explanation: "Window position                Max\n---------------               -----\n[1  3  -1] -3  5  3  6  7       3\n 1 [3  -1  -3] 5  3  6  7       3\n 1  3 [-1  -3  5] 3  6  7       5\n 1  3  -1 [-3  5  3] 6  7       5\n 1  3  -1  -3 [5  3  6] 7       6\n 1  3  -1  -3  5 [3  6  7]      7"
      },
      {
        input: "nums = [1], k = 1",
        output: "[1]"
      }
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public int[] maxSlidingWindow(int[] nums, int k) {
    if (nums.length == 0 || k == 0) {
        return new int[0];
    }
    
    int n = nums.length;
    int[] result = new int[n - k + 1];
    
    for (int i = 0; i <= n - k; i++) {
        int max = Integer.MIN_VALUE;
        
        for (int j = i; j < i + k; j++) {
            max = Math.max(max, nums[j]);
        }
        
        result[i] = max;
    }
    
    return result;
}`,
        timeComplexity: "O(n * k)",
        spaceComplexity: "O(n)",
        explanation: "For each window position, we find the maximum element by scanning through the window."
      },
      {
        approach: "Optimal",
        code: `public int[] maxSlidingWindow(int[] nums, int k) {
    if (nums.length == 0 || k == 0) {
        return new int[0];
    }
    
    int n = nums.length;
    int[] result = new int[n - k + 1];
    Deque<Integer> deque = new ArrayDeque<>();
    
    for (int i = 0; i < n; i++) {
        // Remove elements outside the window
        while (!deque.isEmpty() && deque.peekFirst() < i - k + 1) {
            deque.removeFirst();
        }
        
        // Remove smaller elements
        while (!deque.isEmpty() && nums[deque.peekLast()] < nums[i]) {
            deque.removeLast();
        }
        
        deque.addLast(i);
        
        // Add to result if window has reached size k
        if (i >= k - 1) {
            result[i - k + 1] = nums[deque.peekFirst()];
        }
    }
    
    return result;
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(k)",
        explanation: "We use a deque to keep track of indices. We maintain the deque such that it contains indices of elements in decreasing order of values. The front of the deque always contains the index of the maximum element in the current window."
      }
    ],
    leetCodeUrl: "https://leetcode.com/problems/sliding-window-maximum/",
    difficulty: "Hard",
    category: "slidingWindow"
  }
];