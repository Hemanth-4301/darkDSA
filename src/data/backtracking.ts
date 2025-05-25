import { Question } from "../types";

export const backtrackingQuestions: Question[] = [
  {
    id: "subsets",
    title: "Subsets",
    description: "Given an integer array nums of unique elements, return all possible subsets (the power set).\n\nThe solution set must not contain duplicate subsets. Return the solution in any order.",
    difficulty: "Medium",
    tags: ["Array", "Backtracking", "Bit Manipulation"],
    examples: [
      {
        input: "nums = [1,2,3]",
        output: "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]"
      },
      {
        input: "nums = [0]",
        output: "[[],[0]]"
      }
    ],
    bruteForceSolution: `class Solution {
    public List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        int n = nums.length;
        
        // Generate all possible combinations using bit manipulation
        for (int i = 0; i < (1 << n); i++) {
            List<Integer> subset = new ArrayList<>();
            for (int j = 0; j < n; j++) {
                if ((i & (1 << j)) != 0) {
                    subset.add(nums[j]);
                }
            }
            result.add(subset);
        }
        
        return result;
    }
}`,
    optimalSolution: `class Solution {
    public List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        backtrack(nums, 0, new ArrayList<>(), result);
        return result;
    }
    
    private void backtrack(int[] nums, int start, List<Integer> current, List<List<Integer>> result) {
        // Add current subset to result
        result.add(new ArrayList<>(current));
        
        // Generate subsets by including elements from start to end
        for (int i = start; i < nums.length; i++) {
            current.add(nums[i]);
            backtrack(nums, i + 1, current, result);
            current.remove(current.size() - 1); // Backtrack
        }
    }
}`,
    bruteForceComplexity: {
      time: "O(2^n * n)",
      space: "O(2^n * n)",
      reasoning: "Generate all 2^n subsets using bit manipulation, each subset takes O(n) to construct."
    },
    optimalComplexity: {
      time: "O(2^n * n)",
      space: "O(n)",
      reasoning: "Backtracking explores all 2^n subsets, recursion depth is O(n)."
    },
    leetcodeUrl: "https://leetcode.com/problems/subsets/"
  },
  {
    id: "combination-sum",
    title: "Combination Sum",
    description: "Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. You may return the combinations in any order.\n\nThe same number may be chosen from candidates an unlimited number of times. Two combinations are unique if the frequency of at least one of the chosen numbers is different.\n\nThe test cases are generated such that the number of unique combinations that sum up to target is less than 150 combinations for the given input.",
    difficulty: "Medium",
    tags: ["Array", "Backtracking"],
    examples: [
      {
        input: "candidates = [2,3,6,7], target = 7",
        output: "[[2,2,3],[7]]",
        explanation: "2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times.\n7 is a candidate, and 7 = 7.\nThese are the only two combinations."
      },
      {
        input: "candidates = [2,3,5], target = 8",
        output: "[[2,2,2,2],[2,3,3],[3,5]]"
      }
    ],
    bruteForceSolution: `class Solution {
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        List<List<Integer>> result = new ArrayList<>();
        generateCombinations(candidates, target, 0, new ArrayList<>(), result);
        return result;
    }
    
    private void generateCombinations(int[] candidates, int target, int index, 
                                    List<Integer> current, List<List<Integer>> result) {
        if (target == 0) {
            result.add(new ArrayList<>(current));
            return;
        }
        
        if (target < 0 || index >= candidates.length) {
            return;
        }
        
        // Include current candidate multiple times
        for (int count = 0; count * candidates[index] <= target; count++) {
            for (int i = 0; i < count; i++) {
                current.add(candidates[index]);
            }
            
            generateCombinations(candidates, target - count * candidates[index], 
                               index + 1, current, result);
            
            for (int i = 0; i < count; i++) {
                current.remove(current.size() - 1);
            }
        }
    }
}`,
    optimalSolution: `class Solution {
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        List<List<Integer>> result = new ArrayList<>();
        backtrack(candidates, target, 0, new ArrayList<>(), result);
        return result;
    }
    
    private void backtrack(int[] candidates, int remain, int start, 
                          List<Integer> current, List<List<Integer>> result) {
        if (remain == 0) {
            result.add(new ArrayList<>(current));
            return;
        }
        
        if (remain < 0) {
            return;
        }
        
        for (int i = start; i < candidates.length; i++) {
            current.add(candidates[i]);
            // Allow reusing same element by passing i (not i+1)
            backtrack(candidates, remain - candidates[i], i, current, result);
            current.remove(current.size() - 1);
        }
    }
}`,
    bruteForceComplexity: {
      time: "O(k * 2^n)",
      space: "O(k * target/min)",
      reasoning: "Try all possible counts for each candidate, potentially exponential combinations."
    },
    optimalComplexity: {
      time: "O(n^(target/min))",
      space: "O(target/min)",
      reasoning: "Recursion depth limited by target/minimum_candidate, each level has n choices."
    },
    leetcodeUrl: "https://leetcode.com/problems/combination-sum/"
  },
  {
    id: "permutations",
    title: "Permutations",
    description: "Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.",
    difficulty: "Medium",
    tags: ["Array", "Backtracking"],
    examples: [
      {
        input: "nums = [1,2,3]",
        output: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]"
      },
      {
        input: "nums = [0,1]",
        output: "[[0,1],[1,0]]"
      }
    ],
    bruteForceSolution: `class Solution {
    public List<List<Integer>> permute(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        List<Integer> numList = new ArrayList<>();
        for (int num : nums) {
            numList.add(num);
        }
        
        generatePermutations(numList, new ArrayList<>(), result);
        return result;
    }
    
    private void generatePermutations(List<Integer> remaining, List<Integer> current, 
                                    List<List<Integer>> result) {
        if (remaining.isEmpty()) {
            result.add(new ArrayList<>(current));
            return;
        }
        
        for (int i = 0; i < remaining.size(); i++) {
            int num = remaining.remove(i);
            current.add(num);
            
            generatePermutations(remaining, current, result);
            
            current.remove(current.size() - 1);
            remaining.add(i, num);
        }
    }
}`,
    optimalSolution: `class Solution {
    public List<List<Integer>> permute(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        backtrack(nums, new ArrayList<>(), new boolean[nums.length], result);
        return result;
    }
    
    private void backtrack(int[] nums, List<Integer> current, boolean[] used, 
                          List<List<Integer>> result) {
        if (current.size() == nums.length) {
            result.add(new ArrayList<>(current));
            return;
        }
        
        for (int i = 0; i < nums.length; i++) {
            if (!used[i]) {
                used[i] = true;
                current.add(nums[i]);
                
                backtrack(nums, current, used, result);
                
                current.remove(current.size() - 1);
                used[i] = false;
            }
        }
    }
}`,
    bruteForceComplexity: {
      time: "O(n! * n)",
      space: "O(n! * n)",
      reasoning: "Generate all n! permutations, each involving list operations that take O(n)."
    },
    optimalComplexity: {
      time: "O(n! * n)",
      space: "O(n)",
      reasoning: "Generate all n! permutations, but use boolean array for O(1) lookup/update."
    },
    leetcodeUrl: "https://leetcode.com/problems/permutations/"
  },
  {
    id: "n-queens",
    title: "N-Queens",
    description: "The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.\n\nGiven an integer n, return all distinct solutions to the n-queens puzzle. You may return the answer in any order.\n\nEach solution contains a distinct board configuration of the n-queens' placement, where 'Q' and '.' both indicate a queen and an empty space, respectively.",
    difficulty: "Hard",
    tags: ["Array", "Backtracking"],
    examples: [
      {
        input: "n = 4",
        output: '[[\".Q..\",\"...Q\",\"Q...\",\"..Q.\"],[\".Q..\",\"...Q\",\"Q...\",\"..Q.\"]]',
        explanation: "There exist two distinct solutions to the 4-queens puzzle"
      },
      {
        input: "n = 1",
        output: '[["Q"]]'
      }
    ],
    bruteForceSolution: `class Solution {
    public List<List<String>> solveNQueens(int n) {
        List<List<String>> result = new ArrayList<>();
        char[][] board = new char[n][n];
        
        // Initialize board
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                board[i][j] = '.';
            }
        }
        
        backtrack(board, 0, result);
        return result;
    }
    
    private void backtrack(char[][] board, int row, List<List<String>> result) {
        int n = board.length;
        
        if (row == n) {
            result.add(construct(board));
            return;
        }
        
        for (int col = 0; col < n; col++) {
            if (isValid(board, row, col)) {
                board[row][col] = 'Q';
                backtrack(board, row + 1, result);
                board[row][col] = '.';
            }
        }
    }
    
    private boolean isValid(char[][] board, int row, int col) {
        int n = board.length;
        
        // Check column
        for (int i = 0; i < row; i++) {
            if (board[i][col] == 'Q') {
                return false;
            }
        }
        
        // Check diagonal (top-left to bottom-right)
        for (int i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j] == 'Q') {
                return false;
            }
        }
        
        // Check diagonal (top-right to bottom-left)
        for (int i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
            if (board[i][j] == 'Q') {
                return false;
            }
        }
        
        return true;
    }
    
    private List<String> construct(char[][] board) {
        List<String> result = new ArrayList<>();
        for (char[] row : board) {
            result.add(new String(row));
        }
        return result;
    }
}`,
    optimalSolution: `class Solution {
    public List<List<String>> solveNQueens(int n) {
        List<List<String>> result = new ArrayList<>();
        boolean[] cols = new boolean[n];
        boolean[] diag1 = new boolean[2 * n - 1]; // row - col + n - 1
        boolean[] diag2 = new boolean[2 * n - 1]; // row + col
        
        backtrack(n, 0, new ArrayList<>(), cols, diag1, diag2, result);
        return result;
    }
    
    private void backtrack(int n, int row, List<String> current, 
                          boolean[] cols, boolean[] diag1, boolean[] diag2,
                          List<List<String>> result) {
        if (row == n) {
            result.add(new ArrayList<>(current));
            return;
        }
        
        for (int col = 0; col < n; col++) {
            int d1 = row - col + n - 1;
            int d2 = row + col;
            
            if (!cols[col] && !diag1[d1] && !diag2[d2]) {
                // Place queen
                char[] rowArray = new char[n];
                Arrays.fill(rowArray, '.');
                rowArray[col] = 'Q';
                current.add(new String(rowArray));
                
                cols[col] = diag1[d1] = diag2[d2] = true;
                
                backtrack(n, row + 1, current, cols, diag1, diag2, result);
                
                // Backtrack
                current.remove(current.size() - 1);
                cols[col] = diag1[d1] = diag2[d2] = false;
            }
        }
    }
}`,
    bruteForceComplexity: {
      time: "O(n! * n²)",
      space: "O(n²)",
      reasoning: "For each queen placement, check entire board for conflicts taking O(n) per validation."
    },
    optimalComplexity: {
      time: "O(n!)",
      space: "O(n)",
      reasoning: "Use boolean arrays for O(1) conflict detection, exploring all valid arrangements."
    },
    leetcodeUrl: "https://leetcode.com/problems/n-queens/"
  },
  {
    id: "word-search",
    title: "Word Search",
    description: "Given an m x n grid of characters board and a string word, return true if word exists in the grid.\n\nThe word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.",
    difficulty: "Medium",
    tags: ["Array", "Backtracking", "Matrix"],
    examples: [
      {
        input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"',
        output: "true"
      },
      {
        input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"',
        output: "true"
      }
    ],
    bruteForceSolution: `class Solution {
    public boolean exist(char[][] board, String word) {
        int m = board.length;
        int n = board[0].length;
        
        // Try starting from each cell
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (dfs(board, word, 0, i, j, new boolean[m][n])) {
                    return true;
                }
            }
        }
        
        return false;
    }
    
    private boolean dfs(char[][] board, String word, int index, int row, int col, boolean[][] visited) {
        if (index == word.length()) return true;
        
        if (row < 0 || row >= board.length || col < 0 || col >= board[0].length ||
            visited[row][col] || board[row][col] != word.charAt(index)) {
            return false;
        }
        
        visited[row][col] = true;
        
        boolean found = dfs(board, word, index + 1, row + 1, col, visited) ||
                       dfs(board, word, index + 1, row - 1, col, visited) ||
                       dfs(board, word, index + 1, row, col + 1, visited) ||
                       dfs(board, word, index + 1, row, col - 1, visited);
        
        visited[row][col] = false; // Backtrack
        return found;
    }
}`,
    optimalSolution: `class Solution {
    public boolean exist(char[][] board, String word) {
        int m = board.length;
        int n = board[0].length;
        
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (dfs(board, word, 0, i, j)) {
                    return true;
                }
            }
        }
        
        return false;
    }
    
    private boolean dfs(char[][] board, String word, int index, int row, int col) {
        if (index == word.length()) return true;
        
        if (row < 0 || row >= board.length || col < 0 || col >= board[0].length ||
            board[row][col] != word.charAt(index)) {
            return false;
        }
        
        char temp = board[row][col];
        board[row][col] = '#'; // Mark as visited
        
        boolean found = dfs(board, word, index + 1, row + 1, col) ||
                       dfs(board, word, index + 1, row - 1, col) ||
                       dfs(board, word, index + 1, row, col + 1) ||
                       dfs(board, word, index + 1, row, col - 1);
        
        board[row][col] = temp; // Backtrack
        return found;
    }
}`,
    bruteForceComplexity: {
      time: "O(m * n * 4^L)",
      space: "O(m * n + L)",
      reasoning: "Try each cell as starting point, DFS explores 4 directions for L characters with visited array."
    },
    optimalComplexity: {
      time: "O(m * n * 4^L)",
      space: "O(L)",
      reasoning: "Same time complexity but use board modification instead of separate visited array."
    },
    leetcodeUrl: "https://leetcode.com/problems/word-search/"
  },
  {
    id: "palindrome-partitioning",
    title: "Palindrome Partitioning",
    description: "Given a string s, partition s such that every substring of the partition is a palindrome. Return all possible palindrome partitioning of s.",
    difficulty: "Medium",
    tags: ["String", "Dynamic Programming", "Backtracking"],
    examples: [
      {
        input: 's = "aab"',
        output: '[["a","a","b"],["aa","b"]]'
      },
      {
        input: 's = "raceacar"',
        output: '[["r","a","c","e","a","c","a","r"],["r","a","ce","c","a","r"],["r","ac","e","ca","r"],["r","ace","ca","r"],["ra","c","e","a","c","ar"],["ra","c","e","aca","r"],["ra","ce","c","ar"],["rac","e","a","car"],["race","a","car"],["raceacar"]]'
      }
    ],
    bruteForceSolution: `class Solution {
    public List<List<String>> partition(String s) {
        List<List<String>> result = new ArrayList<>();
        backtrack(s, 0, new ArrayList<>(), result);
        return result;
    }
    
    private void backtrack(String s, int start, List<String> current, List<List<String>> result) {
        if (start >= s.length()) {
            result.add(new ArrayList<>(current));
            return;
        }
        
        for (int end = start; end < s.length(); end++) {
            String substring = s.substring(start, end + 1);
            if (isPalindrome(substring)) {
                current.add(substring);
                backtrack(s, end + 1, current, result);
                current.remove(current.size() - 1);
            }
        }
    }
    
    private boolean isPalindrome(String str) {
        int left = 0, right = str.length() - 1;
        while (left < right) {
            if (str.charAt(left++) != str.charAt(right--)) {
                return false;
            }
        }
        return true;
    }
}`,
    optimalSolution: `class Solution {
    public List<List<String>> partition(String s) {
        int n = s.length();
        boolean[][] dp = new boolean[n][n];
        
        // Precompute palindrome table
        for (int i = 0; i < n; i++) {
            dp[i][i] = true;
        }
        
        for (int i = 0; i < n - 1; i++) {
            dp[i][i + 1] = (s.charAt(i) == s.charAt(i + 1));
        }
        
        for (int len = 3; len <= n; len++) {
            for (int i = 0; i <= n - len; i++) {
                int j = i + len - 1;
                dp[i][j] = (s.charAt(i) == s.charAt(j)) && dp[i + 1][j - 1];
            }
        }
        
        List<List<String>> result = new ArrayList<>();
        backtrack(s, 0, new ArrayList<>(), result, dp);
        return result;
    }
    
    private void backtrack(String s, int start, List<String> current, 
                          List<List<String>> result, boolean[][] dp) {
        if (start >= s.length()) {
            result.add(new ArrayList<>(current));
            return;
        }
        
        for (int end = start; end < s.length(); end++) {
            if (dp[start][end]) {
                current.add(s.substring(start, end + 1));
                backtrack(s, end + 1, current, result, dp);
                current.remove(current.size() - 1);
            }
        }
    }
}`,
    bruteForceComplexity: {
      time: "O(2^n * n)",
      space: "O(n)",
      reasoning: "For each position, try all possible partitions, checking palindrome takes O(n)."
    },
    optimalComplexity: {
      time: "O(2^n + n²)",
      space: "O(n²)",
      reasoning: "Precompute palindrome table in O(n²), then backtrack explores 2^n partitions."
    },
    leetcodeUrl: "https://leetcode.com/problems/palindrome-partitioning/"
  }
];
