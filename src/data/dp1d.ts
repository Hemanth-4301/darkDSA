import { Question } from "../types";

export const dp1dQuestions: Question[] = [
  {
    id: 79,
    title: "Climbing Stairs",
    description:
      "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
    examples: [
      {
        input: "n = 2",
        output: "2",
        explanation:
          "There are two ways to climb to the top: 1. 1 step + 1 step, 2. 2 steps",
      },
      {
        input: "n = 3",
        output: "3",
        explanation:
          "There are three ways to climb to the top: 1. 1 step + 1 step + 1 step, 2. 1 step + 2 steps, 3. 2 steps + 1 step",
      },
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public int climbStairs(int n) {
    if (n <= 2) return n;
    return climbStairs(n-1) + climbStairs(n-2);
}`,
        timeComplexity: "O(2^n)",
        spaceComplexity: "O(n)",
        explanation:
          "We use recursion to try all possible combinations of 1 and 2 steps.",
      },
      {
        approach: "Optimal",
        code: `public int climbStairs(int n) {
    if (n <= 2) return n;
    
    int[] dp = new int[n + 1];
    dp[1] = 1;
    dp[2] = 2;
    
    for (int i = 3; i <= n; i++) {
        dp[i] = dp[i-1] + dp[i-2];
    }
    
    return dp[n];
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        explanation:
          "We use dynamic programming. For each step i, the number of ways is the sum of ways to reach step i-1 and i-2.",
      },
    ],
    leetCodeUrl: "https://leetcode.com/problems/climbing-stairs/",
    difficulty: "Easy",
    category: "dp1d",
  },
  {
    id: 79,
    title: "House Robber",
    description:
      "You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night. Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.",
    examples: [
      {
        input: "nums = [1,2,3,1]",
        output: "4",
        explanation:
          "Rob house 1 (money = 1) and then rob house 3 (money = 3). Total amount you can rob = 1 + 3 = 4.",
      },
      {
        input: "nums = [2,7,9,3,1]",
        output: "12",
        explanation:
          "Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1). Total amount you can rob = 2 + 9 + 1 = 12.",
      },
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public int rob(int[] nums) {
    return rob(nums, nums.length - 1);
}

private int rob(int[] nums, int i) {
    if (i < 0) return 0;
    return Math.max(rob(nums, i-2) + nums[i], rob(nums, i-1));
}`,
        timeComplexity: "O(2^n)",
        spaceComplexity: "O(n)",
        explanation:
          "We use recursion to try all possible combinations of houses to rob.",
      },
      {
        approach: "Optimal",
        code: `public int rob(int[] nums) {
    if (nums.length == 0) return 0;
    if (nums.length == 1) return nums[0];
    
    int[] dp = new int[nums.length];
    dp[0] = nums[0];
    dp[1] = Math.max(nums[0], nums[1]);
    
    for (int i = 2; i < nums.length; i++) {
        dp[i] = Math.max(dp[i-1], dp[i-2] + nums[i]);
    }
    
    return dp[nums.length - 1];
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        explanation:
          "We use dynamic programming. For each house i, we either rob it (add its money to max money from i-2) or skip it (take max money from i-1).",
      },
    ],
    leetCodeUrl: "https://leetcode.com/problems/house-robber/",
    difficulty: "Medium",
    category: "dp1d",
  },
  {
    id: 80,
    title: "House Robber II",
    description:
      "You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. All houses at this place are arranged in a circle. That means the first house is the neighbor of the last one. Meanwhile, adjacent houses have a security system connected, and it will automatically contact the police if two adjacent houses were broken into on the same night. Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.",
    examples: [
      {
        input: "nums = [2,3,2]",
        output: "3",
        explanation:
          "You cannot rob house 1 (money = 2) and then rob house 3 (money = 2), because they are adjacent houses.",
      },
      {
        input: "nums = [1,2,3,1]",
        output: "4",
        explanation:
          "Rob house 1 (money = 1) and then rob house 3 (money = 3).",
      },
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public int rob(int[] nums) {
    if (nums.length == 0) return 0;
    if (nums.length == 1) return nums[0];
    return Math.max(rob(nums, 0, nums.length-2), 
                   rob(nums, 1, nums.length-1));
}

private int rob(int[] nums, int start, int end) {
    int prev2 = 0, prev1 = 0;
    for (int i = start; i <= end; i++) {
        int temp = prev1;
        prev1 = Math.max(prev2 + nums[i], prev1);
        prev2 = temp;
    }
    return prev1;
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        explanation:
          "We solve the problem twice: once excluding the first house and once excluding the last house.",
      },
      {
        approach: "Optimal",
        code: `public int rob(int[] nums) {
    if (nums.length == 0) return 0;
    if (nums.length == 1) return nums[0];
    if (nums.length == 2) return Math.max(nums[0], nums[1]);
    
    return Math.max(robRange(nums, 0, nums.length-2), 
                   robRange(nums, 1, nums.length-1));
}

private int robRange(int[] nums, int start, int end) {
    int[] dp = new int[nums.length];
    dp[start] = nums[start];
    dp[start+1] = Math.max(nums[start], nums[start+1]);
    
    for (int i = start+2; i <= end; i++) {
        dp[i] = Math.max(dp[i-1], dp[i-2] + nums[i]);
    }
    
    return dp[end];
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        explanation:
          "We use dynamic programming twice: once for houses 0 to n-2 and once for houses 1 to n-1. The maximum of these two results is our answer.",
      },
    ],
    leetCodeUrl: "https://leetcode.com/problems/house-robber-ii/",
    difficulty: "Medium",
    category: "dp1d",
  },
  {
    id: 81,
    title: "Longest Palindromic Substring",
    description:
      "Given a string s, return the longest palindromic substring in s.",
    examples: [
      {
        input: 's = "babad"',
        output: '"bab"',
        explanation: '"aba" is also a valid answer.',
      },
      {
        input: 's = "cbbd"',
        output: '"bb"',
      },
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public String longestPalindrome(String s) {
    String longest = "";
    
    for (int i = 0; i < s.length(); i++) {
        for (int j = i; j < s.length(); j++) {
            String substr = s.substring(i, j + 1);
            if (isPalindrome(substr) && substr.length() > longest.length()) {
                longest = substr;
            }
        }
    }
    
    return longest;
}

private boolean isPalindrome(String s) {
    int left = 0, right = s.length() - 1;
    while (left < right) {
        if (s.charAt(left++) != s.charAt(right--)) {
            return false;
        }
    }
    return true;
}`,
        timeComplexity: "O(n³)",
        spaceComplexity: "O(1)",
        explanation:
          "We check all possible substrings and verify if each is a palindrome.",
      },
      {
        approach: "Optimal",
        code: `public String longestPalindrome(String s) {
    if (s == null || s.length() < 2) return s;
    
    int start = 0, maxLength = 1;
    
    for (int i = 0; i < s.length(); i++) {
        // Odd length palindromes
        int len1 = expandAroundCenter(s, i, i);
        // Even length palindromes
        int len2 = expandAroundCenter(s, i, i + 1);
        
        int len = Math.max(len1, len2);
        if (len > maxLength) {
            start = i - (len - 1) / 2;
            maxLength = len;
        }
    }
    
    return s.substring(start, start + maxLength);
}

private int expandAroundCenter(String s, int left, int right) {
    while (left >= 0 && right < s.length() && 
           s.charAt(left) == s.charAt(right)) {
        left--;
        right++;
    }
    return right - left - 1;
}`,
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        explanation:
          "We use the expand around center technique. For each character, we try to expand around it to find palindromes of both odd and even lengths.",
      },
    ],
    leetCodeUrl: "https://leetcode.com/problems/longest-palindromic-substring/",
    difficulty: "Medium",
    category: "dp1d",
  },
  {
    id: 82,
    title: "Palindromic Substrings",
    description:
      "Given a string s, return the number of palindromic substrings in it. A string is a palindrome when it reads the same backward as forward.",
    examples: [
      {
        input: 's = "abc"',
        output: "3",
        explanation: 'All palindromic substrings are: "a", "b", "c".',
      },
      {
        input: 's = "aaa"',
        output: "6",
        explanation:
          'All palindromic substrings are: "a", "a", "a", "aa", "aa", "aaa".',
      },
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public int countSubstrings(String s) {
    int count = 0;
    
    for (int i = 0; i < s.length(); i++) {
        for (int j = i; j < s.length(); j++) {
            if (isPalindrome(s, i, j)) {
                count++;
            }
        }
    }
    
    return count;
}

private boolean isPalindrome(String s, int start, int end) {
    while (start < end) {
        if (s.charAt(start++) != s.charAt(end--)) {
            return false;
        }
    }
    return true;
}`,
        timeComplexity: "O(n³)",
        spaceComplexity: "O(1)",
        explanation:
          "We check all possible substrings and count those that are palindromes.",
      },
      {
        approach: "Optimal",
        code: `public int countSubstrings(String s) {
    int count = 0;
    
    for (int i = 0; i < s.length(); i++) {
        // Count odd length palindromes
        count += expandAroundCenter(s, i, i);
        // Count even length palindromes
        count += expandAroundCenter(s, i, i + 1);
    }
    
    return count;
}

private int expandAroundCenter(String s, int left, int right) {
    int count = 0;
    
    while (left >= 0 && right < s.length() && 
           s.charAt(left) == s.charAt(right)) {
        count++;
        left--;
        right++;
    }
    
    return count;
}`,
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        explanation:
          "We use expand around center technique. For each character, we count palindromes of both odd and even lengths centered at that character.",
      },
    ],
    leetCodeUrl: "https://leetcode.com/problems/palindromic-substrings/",
    difficulty: "Medium",
    category: "dp1d",
  },
  {
    id: 83,
    title: "Decode Ways",
    description:
      "A message containing letters from A-Z can be encoded into numbers using the following mapping: 'A' -> \"1\", 'B' -> \"2\", ..., 'Z' -> \"26\". Given a string s containing only digits, return the number of ways to decode it.",
    examples: [
      {
        input: 's = "12"',
        output: "2",
        explanation: '"12" could be decoded as "AB" (1 2) or "L" (12).',
      },
      {
        input: 's = "226"',
        output: "3",
        explanation:
          '"226" could be decoded as "BZ" (2 26), "VF" (22 6), or "BBF" (2 2 6).',
      },
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public int numDecodings(String s) {
    return decode(s, 0);
}

private int decode(String s, int index) {
    if (index == s.length()) return 1;
    if (s.charAt(index) == '0') return 0;
    if (index == s.length() - 1) return 1;
    
    int ways = decode(s, index + 1);
    if (Integer.parseInt(s.substring(index, index + 2)) <= 26) {
        ways += decode(s, index + 2);
    }
    
    return ways;
}`,
        timeComplexity: "O(2^n)",
        spaceComplexity: "O(n)",
        explanation:
          "We use recursion to try decoding one or two digits at a time.",
      },
      {
        approach: "Optimal",
        code: `public int numDecodings(String s) {
    if (s == null || s.length() == 0) return 0;
    
    int n = s.length();
    int[] dp = new int[n + 1];
    dp[0] = 1;
    dp[1] = s.charAt(0) == '0' ? 0 : 1;
    
    for (int i = 2; i <= n; i++) {
        // One digit
        if (s.charAt(i-1) != '0') {
            dp[i] += dp[i-1];
        }
        
        // Two digits
        int twoDigit = Integer.parseInt(s.substring(i-2, i));
        if (twoDigit >= 10 && twoDigit <= 26) {
            dp[i] += dp[i-2];
        }
    }
    
    return dp[n];
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        explanation:
          "We use dynamic programming. For each position, we consider decoding one digit or two digits if possible.",
      },
    ],
    leetCodeUrl: "https://leetcode.com/problems/decode-ways/",
    difficulty: "Medium",
    category: "dp1d",
  },
  {
    id: 84,
    title: "Coin Change",
    description:
      "You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money. Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.",
    examples: [
      {
        input: "coins = [1,2,5], amount = 11",
        output: "3",
        explanation: "11 = 5 + 5 + 1",
      },
      {
        input: "coins = [2], amount = 3",
        output: "-1",
      },
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public int coinChange(int[] coins, int amount) {
    return coinChangeHelper(coins, amount);
}

private int coinChangeHelper(int[] coins, int remaining) {
    if (remaining < 0) return -1;
    if (remaining == 0) return 0;
    
    int minCoins = Integer.MAX_VALUE;
    for (int coin : coins) {
        int result = coinChangeHelper(coins, remaining - coin);
        if (result >= 0) {
            minCoins = Math.min(minCoins, result + 1);
        }
    }
    
    return minCoins == Integer.MAX_VALUE ? -1 : minCoins;
}`,
        timeComplexity: "O(amount^n) where n is number of coin denominations",
        spaceComplexity: "O(amount)",
        explanation:
          "We use recursion to try all possible combinations of coins.",
      },
      {
        approach: "Optimal",
        code: `public int coinChange(int[] coins, int amount) {
    int[] dp = new int[amount + 1];
    Arrays.fill(dp, amount + 1);
    dp[0] = 0;
    
    for (int i = 1; i <= amount; i++) {
        for (int coin : coins) {
            if (coin <= i) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }
    
    return dp[amount] > amount ? -1 : dp[amount];
}`,
        timeComplexity: "O(amount * number of coins)",
        spaceComplexity: "O(amount)",
        explanation:
          "We use dynamic programming. For each amount i, we try using each coin and take the minimum number of coins needed.",
      },
    ],
    leetCodeUrl: "https://leetcode.com/problems/coin-change/",
    difficulty: "Medium",
    category: "dp1d",
  },
  {
    id: 85,
    title: "Maximum Product Subarray",
    description:
      "Given an integer array nums, find a contiguous non-empty subarray within the array that has the largest product, and return the product.",
    examples: [
      {
        input: "nums = [2,3,-2,4]",
        output: "6",
        explanation: "[2,3] has the largest product 6.",
      },
      {
        input: "nums = [-2,0,-1]",
        output: "0",
        explanation:
          "The result cannot be 2, because [-2,-1] is not a subarray.",
      },
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public int maxProduct(int[] nums) {
    int maxProduct = nums[0];
    
    for (int i = 0; i < nums.length; i++) {
        int product = 1;
        for (int j = i; j < nums.length; j++) {
            product *= nums[j];
            maxProduct = Math.max(maxProduct, product);
        }
    }
    
    return maxProduct;
}`,
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        explanation:
          "We try all possible subarrays and keep track of the maximum product.",
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
        explanation:
          "We keep track of both maximum and minimum products ending at current position, because a minimum product can become maximum when multiplied by a negative number.",
      },
    ],
    leetCodeUrl: "https://leetcode.com/problems/maximum-product-subarray/",
    difficulty: "Medium",
    category: "dp1d",
  },
  {
    id: 86,
    title: "Word Break",
    description:
      "Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.",
    examples: [
      {
        input: 's = "leetcode", wordDict = ["leet","code"]',
        output: "true",
        explanation:
          'Return true because "leetcode" can be segmented as "leet code".',
      },
      {
        input: 's = "applepenapple", wordDict = ["apple","pen"]',
        output: "true",
        explanation:
          'Return true because "applepenapple" can be segmented as "apple pen apple".',
      },
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public boolean wordBreak(String s, List<String> wordDict) {
    return wordBreakHelper(s, new HashSet<>(wordDict), 0);
}

private boolean wordBreakHelper(String s, Set<String> dict, int start) {
    if (start == s.length()) return true;
    
    for (int end = start + 1; end <= s.length(); end++) {
        if (dict.contains(s.substring(start, end)) && 
            wordBreakHelper(s, dict, end)) {
            return true;
        }
    }
    
    return false;
}`,
        timeComplexity: "O(2^n)",
        spaceComplexity: "O(n)",
        explanation:
          "We use recursion to try all possible ways to break the string into dictionary words.",
      },
      {
        approach: "Optimal",
        code: `public boolean wordBreak(String s, List<String> wordDict) {
    Set<String> dict = new HashSet<>(wordDict);
    boolean[] dp = new boolean[s.length() + 1];
    dp[0] = true;
    
    for (int i = 1; i <= s.length(); i++) {
        for (int j = 0; j < i; j++) {
            if (dp[j] && dict.contains(s.substring(j, i))) {
                dp[i] = true;
                break;
            }
        }
    }
    
    return dp[s.length()];
}`,
        timeComplexity: "O(n²)",
        spaceComplexity: "O(n)",
        explanation:
          "We use dynamic programming. dp[i] represents whether the substring ending at i can be segmented into dictionary words.",
      },
    ],
    leetCodeUrl: "https://leetcode.com/problems/word-break/",
    difficulty: "Medium",
    category: "dp1d",
  },
  {
    id: 87,
    title: "Longest Increasing Subsequence",
    description:
      "Given an integer array nums, return the length of the longest strictly increasing subsequence.",
    examples: [
      {
        input: "nums = [10,9,2,5,3,7,101,18]",
        output: "4",
        explanation:
          "The longest increasing subsequence is [2,3,7,101], therefore the length is 4.",
      },
      {
        input: "nums = [0,1,0,3,2,3]",
        output: "4",
      },
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public int lengthOfLIS(int[] nums) {
    return lengthOfLIS(nums, Integer.MIN_VALUE, 0);
}

private int lengthOfLIS(int[] nums, int prev, int pos) {
    if (pos == nums.length) return 0;
    
    int taken = 0;
    if (nums[pos] > prev) {
        taken = 1 + lengthOfLIS(nums, nums[pos], pos + 1);
    }
    int notTaken = lengthOfLIS(nums, prev, pos + 1);
    
    return Math.max(taken, notTaken);
}`,
        timeComplexity: "O(2^n)",
        spaceComplexity: "O(n)",
        explanation: "We use recursion to try all possible subsequences.",
      },
      {
        approach: "Optimal",
        code: `public int lengthOfLIS(int[] nums) {
    int[] dp = new int[nums.length];
    Arrays.fill(dp, 1);
    int maxLen = 1;
    
    for (int i = 1; i < nums.length; i++) {
        for (int j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
        maxLen = Math.max(maxLen, dp[i]);
    }
    
    return maxLen;
}`,
        timeComplexity: "O(n²)",
        spaceComplexity: "O(n)",
        explanation:
          "We use dynamic programming. dp[i] represents the length of the longest increasing subsequence ending at index i.",
      },
    ],
    leetCodeUrl:
      "https://leetcode.com/problems/longest-increasing-subsequence/",
    difficulty: "Medium",
    category: "dp1d",
  },
];
