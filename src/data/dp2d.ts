import { Question } from "../types";

export const dp2dQuestions: Question[] = [
  {
    id: 88,
    title: "Unique Paths",
    description:
      "A robot is located at the top-left corner of a m x n grid. The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid. How many possible unique paths are there?",
    examples: [
      {
        input: "m = 3, n = 7",
        output: "28",
      },
      {
        input: "m = 3, n = 2",
        output: "3",
        explanation:
          "From the top-left corner, there are a total of 3 ways to reach the bottom-right corner: 1. Right -> Down -> Down, 2. Down -> Down -> Right, 3. Down -> Right -> Down",
      },
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public int uniquePaths(int m, int n) {
    if (m == 1 || n == 1) return 1;
    return uniquePaths(m-1, n) + uniquePaths(m, n-1);
}`,
        timeComplexity: "O(2^(m+n))",
        spaceComplexity: "O(m+n)",
        explanation:
          "We use recursion to try all possible paths by moving either down or right.",
      },
      {
        approach: "Optimal",
        code: `public int uniquePaths(int m, int n) {
    int[][] dp = new int[m][n];
    
    // First row
    for (int j = 0; j < n; j++) {
        dp[0][j] = 1;
    }
    
    // First column
    for (int i = 0; i < m; i++) {
        dp[i][0] = 1;
    }
    
    // Fill rest of the table
    for (int i = 1; i < m; i++) {
        for (int j = 1; j < n; j++) {
            dp[i][j] = dp[i-1][j] + dp[i][j-1];
        }
    }
    
    return dp[m-1][n-1];
}`,
        timeComplexity: "O(m*n)",
        spaceComplexity: "O(m*n)",
        explanation:
          "We use dynamic programming. Each cell represents the number of unique paths to reach that cell.",
      },
    ],
    leetCodeUrl: "https://leetcode.com/problems/unique-paths/",
    difficulty: "Medium",
    category: "dp2d",
  },
  {
    id: 89,
    title: "Longest Common Subsequence",
    description:
      "Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence, return 0.",
    examples: [
      {
        input: 'text1 = "abcde", text2 = "ace"',
        output: "3",
        explanation:
          'The longest common subsequence is "ace" and its length is 3.',
      },
      {
        input: 'text1 = "abc", text2 = "abc"',
        output: "3",
        explanation:
          'The longest common subsequence is "abc" and its length is 3.',
      },
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public int longestCommonSubsequence(String text1, String text2) {
    return lcs(text1, text2, text1.length(), text2.length());
}

private int lcs(String text1, String text2, int m, int n) {
    if (m == 0 || n == 0) return 0;
    
    if (text1.charAt(m-1) == text2.charAt(n-1)) {
        return 1 + lcs(text1, text2, m-1, n-1);
    }
    
    return Math.max(lcs(text1, text2, m-1, n), 
                   lcs(text1, text2, m, n-1));
}`,
        timeComplexity: "O(2^(m+n))",
        spaceComplexity: "O(m+n)",
        explanation: "We use recursion to try all possible subsequences.",
      },
      {
        approach: "Optimal",
        code: `public int longestCommonSubsequence(String text1, String text2) {
    int m = text1.length();
    int n = text2.length();
    int[][] dp = new int[m + 1][n + 1];
    
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (text1.charAt(i-1) == text2.charAt(j-1)) {
                dp[i][j] = dp[i-1][j-1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
            }
        }
    }
    
    return dp[m][n];
}`,
        timeComplexity: "O(m*n)",
        spaceComplexity: "O(m*n)",
        explanation:
          "We use dynamic programming. dp[i][j] represents the length of LCS of text1[0...i-1] and text2[0...j-1].",
      },
    ],
    leetCodeUrl: "https://leetcode.com/problems/longest-common-subsequence/",
    difficulty: "Medium",
    category: "dp2d",
  },
  {
    id: 90,
    title: "Best Time to Buy and Sell Stock with Cooldown",
    description:
      "You are given an array prices where prices[i] is the price of a given stock on the ith day. Find the maximum profit you can achieve. You may complete as many transactions as you like (i.e., buy one and sell one share of the stock multiple times) with the following restrictions: After you sell your stock, you cannot buy stock on the next day (i.e., cooldown one day).",
    examples: [
      {
        input: "prices = [1,2,3,0,2]",
        output: "3",
        explanation: "transactions = [buy, sell, cooldown, buy, sell]",
      },
      {
        input: "prices = [1]",
        output: "0",
      },
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public int maxProfit(int[] prices) {
    return maxProfit(prices, 0, true);
}

private int maxProfit(int[] prices, int day, boolean canBuy) {
    if (day >= prices.length) return 0;
    
    int doNothing = maxProfit(prices, day + 1, canBuy);
    int doSomething = 0;
    
    if (canBuy) {
        doSomething = -prices[day] + maxProfit(prices, day + 1, false);
    } else {
        doSomething = prices[day] + maxProfit(prices, day + 2, true);
    }
    
    return Math.max(doNothing, doSomething);
}`,
        timeComplexity: "O(2^n)",
        spaceComplexity: "O(n)",
        explanation:
          "We use recursion to try all possible combinations of buying and selling with cooldown.",
      },
      {
        approach: "Optimal",
        code: `public int maxProfit(int[] prices) {
    if (prices.length <= 1) return 0;
    
    int[] buy = new int[prices.length];
    int[] sell = new int[prices.length];
    int[] cool = new int[prices.length];
    
    buy[0] = -prices[0];
    
    for (int i = 1; i < prices.length; i++) {
        buy[i] = Math.max(buy[i-1], cool[i-1] - prices[i]);
        sell[i] = Math.max(sell[i-1], buy[i-1] + prices[i]);
        cool[i] = Math.max(cool[i-1], sell[i-1]);
    }
    
    return sell[prices.length-1];
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        explanation:
          "We use dynamic programming with three states: buy, sell, and cooldown. For each day, we calculate the maximum profit for each state.",
      },
    ],
    leetCodeUrl:
      "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/",
    difficulty: "Medium",
    category: "dp2d",
  },
  {
    id: 91,
    title: "Coin Change II",
    description:
      "You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money. Return the number of combinations that make up that amount. If that amount of money cannot be made up by any combination of the coins, return 0.",
    examples: [
      {
        input: "amount = 5, coins = [1,2,5]",
        output: "4",
        explanation:
          "there are four ways to make up the amount: 5=5, 5=2+2+1, 5=2+1+1+1, 5=1+1+1+1+1",
      },
      {
        input: "amount = 3, coins = [2]",
        output: "0",
        explanation: "the amount of 3 cannot be made up just with coins of 2.",
      },
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public int change(int amount, int[] coins) {
    return change(amount, coins, coins.length);
}

private int change(int amount, int[] coins, int n) {
    if (amount == 0) return 1;
    if (amount < 0 || n == 0) return 0;
    
    return change(amount - coins[n-1], coins, n) + 
           change(amount, coins, n-1);
}`,
        timeComplexity: "O(2^(amount+n))",
        spaceComplexity: "O(amount+n)",
        explanation:
          "We use recursion to try all possible combinations of coins.",
      },
      {
        approach: "Optimal",
        code: `public int change(int amount, int[] coins) {
    int[] dp = new int[amount + 1];
    dp[0] = 1;
    
    for (int coin : coins) {
        for (int i = coin; i <= amount; i++) {
            dp[i] += dp[i - coin];
        }
    }
    
    return dp[amount];
}`,
        timeComplexity: "O(amount * number of coins)",
        spaceComplexity: "O(amount)",
        explanation:
          "We use dynamic programming. For each coin, we update the number of ways to make each amount from coin to target amount.",
      },
    ],
    leetCodeUrl: "https://leetcode.com/problems/coin-change-2/",
    difficulty: "Medium",
    category: "dp2d",
  },
  {
    id: 92,
    title: "Target Sum",
    description:
      "You are given an integer array nums and an integer target. You want to build an expression out of nums by adding one of the symbols '+' or '-' before each integer in nums and then concatenate all the integers. Return the number of different expressions that you can build, which evaluates to target.",
    examples: [
      {
        input: "nums = [1,1,1,1,1], target = 3",
        output: "5",
        explanation:
          "There are 5 ways to assign symbols to make the sum of nums be target 3: -1+1+1+1+1 = 3, +1-1+1+1+1 = 3, +1+1-1+1+1 = 3, +1+1+1-1+1 = 3, +1+1+1+1-1 = 3",
      },
      {
        input: "nums = [1], target = 1",
        output: "1",
      },
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public int findTargetSumWays(int[] nums, int target) {
    return findWays(nums, target, 0, 0);
}

private int findWays(int[] nums, int target, int index, int sum) {
    if (index == nums.length) {
        return sum == target ? 1 : 0;
    }
    
    return findWays(nums, target, index + 1, sum + nums[index]) +
           findWays(nums, target, index + 1, sum - nums[index]);
}`,
        timeComplexity: "O(2^n)",
        spaceComplexity: "O(n)",
        explanation:
          "We use recursion to try all possible combinations of + and - signs.",
      },
      {
        approach: "Optimal",
        code: `public int findTargetSumWays(int[] nums, int target) {
    int sum = 0;
    for (int num : nums) {
        sum += num;
    }
    
    if (Math.abs(target) > sum) return 0;
    
    int[][] dp = new int[nums.length + 1][2 * sum + 1];
    dp[0][sum] = 1;
    
    for (int i = 1; i <= nums.length; i++) {
        for (int j = 0; j < 2 * sum + 1; j++) {
            if (j + nums[i-1] < 2 * sum + 1) {
                dp[i][j] += dp[i-1][j + nums[i-1]];
            }
            if (j - nums[i-1] >= 0) {
                dp[i][j] += dp[i-1][j - nums[i-1]];
            }
        }
    }
    
    return dp[nums.length][sum + target];
}`,
        timeComplexity: "O(n * sum)",
        spaceComplexity: "O(n * sum)",
        explanation:
          "We use dynamic programming. dp[i][j] represents the number of ways to achieve sum j using first i numbers.",
      },
    ],
    leetCodeUrl: "https://leetcode.com/problems/target-sum/",
    difficulty: "Medium",
    category: "dp2d",
  },
  {
    id: 93,
    title: "Interleaving String",
    description:
      "Given strings s1, s2, and s3, find whether s3 is formed by an interleaving of s1 and s2. An interleaving of two strings s and t is a configuration where they are divided into non-empty substrings such that: s = s1 + s2 + ... + sn, t = t1 + t2 + ... + tm, |n - m| <= 1, The interleaving is s1 + t1 + s2 + t2 + s3 + t3 + ... or t1 + s1 + t2 + s2 + t3 + s3 + ...",
    examples: [
      {
        input: 's1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"',
        output: "true",
      },
      {
        input: 's1 = "aabcc", s2 = "dbbca", s3 = "aadbbbaccc"',
        output: "false",
      },
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public boolean isInterleave(String s1, String s2, String s3) {
    if (s1.length() + s2.length() != s3.length()) return false;
    return isInterleave(s1, s2, s3, 0, 0, 0);
}

private boolean isInterleave(String s1, String s2, String s3, 
                           int i, int j, int k) {
    if (k == s3.length()) return true;
    
    boolean valid = false;
    if (i < s1.length() && s1.charAt(i) == s3.charAt(k)) {
        valid = isInterleave(s1, s2, s3, i + 1, j, k + 1);
    }
    if (!valid && j < s2.length() && s2.charAt(j) == s3.charAt(k)) {
        valid = isInterleave(s1, s2, s3, i, j + 1, k + 1);
    }
    
    return valid;
}`,
        timeComplexity: "O(2^(m+n))",
        spaceComplexity: "O(m+n)",
        explanation:
          "We use recursion to try all possible ways to interleave the strings.",
      },
      {
        approach: "Optimal",
        code: `public boolean isInterleave(String s1, String s2, String s3) {
    if (s1.length() + s2.length() != s3.length()) return false;
    
    boolean[][] dp = new boolean[s1.length() + 1][s2.length() + 1];
    dp[0][0] = true;
    
    for (int i = 1; i <= s1.length(); i++) {
        dp[i][0] = dp[i-1][0] && s1.charAt(i-1) == s3.charAt(i-1);
    }
    
    for (int j = 1; j <= s2.length(); j++) {
        dp[0][j] = dp[0][j-1] && s2.charAt(j-1) == s3.charAt(j-1);
    }
    
    for (int i = 1; i <= s1.length(); i++) {
        for (int j = 1; j <= s2.length(); j++) {
            dp[i][j] = (dp[i-1][j] && s1.charAt(i-1) == s3.charAt(i+j-1)) ||
                      (dp[i][j-1] && s2.charAt(j-1) == s3.charAt(i+j-1));
        }
    }
    
    return dp[s1.length()][s2.length()];
}`,
        timeComplexity: "O(m*n)",
        spaceComplexity: "O(m*n)",
        explanation:
          "We use dynamic programming. dp[i][j] represents whether s3[0..i+j] is formed by interleaving s1[0..i] and s2[0..j].",
      },
    ],
    leetCodeUrl: "https://leetcode.com/problems/interleaving-string/",
    difficulty: "Medium",
    category: "dp2d",
  },
];
