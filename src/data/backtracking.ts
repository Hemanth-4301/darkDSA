import { Question } from '../types';

export const backtrackingQuestions: Question[] = [
  {
    id: 66,
    title: "Subsets",
    description: "Given an integer array nums of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets. Return the solution in any order.",
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
    solutions: [
      {
        approach: "Brute Force",
        code: `public List<List<Integer>> subsets(int[] nums) {
    List<List<Integer>> result = new ArrayList<>();
    int n = nums.length;
    
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
}`,
        timeComplexity: "O(n * 2^n)",
        spaceComplexity: "O(n * 2^n)",
        explanation: "We use bit manipulation to generate all possible combinations. Each bit represents whether to include the corresponding number."
      },
      {
        approach: "Optimal",
        code: `public List<List<Integer>> subsets(int[] nums) {
    List<List<Integer>> result = new ArrayList<>();
    backtrack(result, new ArrayList<>(), nums, 0);
    return result;
}

private void backtrack(List<List<Integer>> result, List<Integer> temp, 
                      int[] nums, int start) {
    result.add(new ArrayList<>(temp));
    
    for (int i = start; i < nums.length; i++) {
        temp.add(nums[i]);
        backtrack(result, temp, nums, i + 1);
        temp.remove(temp.size() - 1);
    }
}`,
        timeComplexity: "O(n * 2^n)",
        spaceComplexity: "O(n)",
        explanation: "We use backtracking to generate all subsets. For each number, we have two choices: include it or not include it."
      }
    ],
    leetCodeUrl: "https://leetcode.com/problems/subsets/",
    difficulty: "Medium",
    category: "backtracking"
  },
  {
    id: 67,
    title: "Combination Sum",
    description: "Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. You may return the combinations in any order. The same number may be chosen from candidates an unlimited number of times.",
    examples: [
      {
        input: "candidates = [2,3,6,7], target = 7",
        output: "[[2,2,3],[7]]",
        explanation: "2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times."
      },
      {
        input: "candidates = [2,3,5], target = 8",
        output: "[[2,2,2,2],[2,3,3],[3,5]]"
      }
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public List<List<Integer>> combinationSum(int[] candidates, int target) {
    List<List<Integer>> result = new ArrayList<>();
    Arrays.sort(candidates);
    
    for (int i = 1; i <= target / candidates[0]; i++) {
        findCombinations(candidates, target, i, new ArrayList<>(), result);
    }
    
    return result;
}

private void findCombinations(int[] candidates, int target, int size,
                            List<Integer> current, List<List<Integer>> result) {
    if (size == 0 && target == 0) {
        result.add(new ArrayList<>(current));
        return;
    }
    if (size == 0 || target <= 0) {
        return;
    }
    
    for (int candidate : candidates) {
        if (current.isEmpty() || candidate >= current.get(current.size() - 1)) {
            current.add(candidate);
            findCombinations(candidates, target - candidate, size - 1, 
                           current, result);
            current.remove(current.size() - 1);
        }
    }
}`,
        timeComplexity: "O(n^target)",
        spaceComplexity: "O(target)",
        explanation: "We try all possible combinations of different sizes up to target/min(candidates)."
      },
      {
        approach: "Optimal",
        code: `public List<List<Integer>> combinationSum(int[] candidates, int target) {
    List<List<Integer>> result = new ArrayList<>();
    backtrack(result, new ArrayList<>(), candidates, target, 0);
    return result;
}

private void backtrack(List<List<Integer>> result, List<Integer> temp,
                      int[] candidates, int remain, int start) {
    if (remain < 0) return;
    if (remain == 0) {
        result.add(new ArrayList<>(temp));
        return;
    }
    
    for (int i = start; i < candidates.length; i++) {
        temp.add(candidates[i]);
        backtrack(result, temp, candidates, remain - candidates[i], i);
        temp.remove(temp.size() - 1);
    }
}`,
        timeComplexity: "O(n^(target/min))",
        spaceComplexity: "O(target/min)",
        explanation: "We use backtracking and keep track of the remaining target. For each number, we can use it multiple times until target becomes 0 or negative."
      }
    ],
    leetCodeUrl: "https://leetcode.com/problems/combination-sum/",
    difficulty: "Medium",
    category: "backtracking"
  },
  {
    id: 68,
    title: "Permutations",
    description: "Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.",
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
    solutions: [
      {
        approach: "Brute Force",
        code: `public List<List<Integer>> permute(int[] nums) {
    List<List<Integer>> result = new ArrayList<>();
    List<Integer> numbers = new ArrayList<>();
    for (int num : nums) numbers.add(num);
    
    generatePermutations(numbers.size(), numbers, result);
    return result;
}

private void generatePermutations(int n, List<Integer> numbers, 
                                List<List<Integer>> result) {
    if (n == 1) {
        result.add(new ArrayList<>(numbers));
        return;
    }
    
    for (int i = 0; i < n; i++) {
        generatePermutations(n - 1, numbers, result);
        
        if (n % 2 == 1) {
            Collections.swap(numbers, 0, n - 1);
        } else {
            Collections.swap(numbers, i, n - 1);
        }
    }
}`,
        timeComplexity: "O(n!)",
        spaceComplexity: "O(n)",
        explanation: "We use Heap's algorithm to generate all permutations by swapping elements."
      },
      {
        approach: "Optimal",
        code: `public List<List<Integer>> permute(int[] nums) {
    List<List<Integer>> result = new ArrayList<>();
    backtrack(result, new ArrayList<>(), nums);
    return result;
}

private void backtrack(List<List<Integer>> result, List<Integer> temp, 
                      int[] nums) {
    if (temp.size() == nums.length) {
        result.add(new ArrayList<>(temp));
        return;
    }
    
    for (int i = 0; i < nums.length; i++) {
        if (temp.contains(nums[i])) continue;
        temp.add(nums[i]);
        backtrack(result, temp, nums);
        temp.remove(temp.size() - 1);
    }
}`,
        timeComplexity: "O(n!)",
        spaceComplexity: "O(n)",
        explanation: "We use backtracking to build permutations one number at a time. For each position, we try each unused number."
      }
    ],
    leetCodeUrl: "https://leetcode.com/problems/permutations/",
    difficulty: "Medium",
    category: "backtracking"
  },
  {
    id: 69,
    title: "N-Queens",
    description: "The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other. Given an integer n, return all distinct solutions to the n-queens puzzle. Each solution contains a distinct board configuration of the n-queens' placement, where 'Q' and '.' both indicate a queen and an empty space, respectively.",
    examples: [
      {
        input: "n = 4",
        output: `[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]`,
        explanation: "There exist two distinct solutions to the 4-queens puzzle as shown above"
      },
      {
        input: "n = 1",
        output: `[["Q"]]`
      }
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public List<List<String>> solveNQueens(int n) {
    List<List<String>> result = new ArrayList<>();
    char[][] board = new char[n][n];
    
    for (int i = 0; i < n; i++) {
        Arrays.fill(board[i], '.');
    }
    
    solve(0, board, result);
    return result;
}

private void solve(int col, char[][] board, List<List<String>> result) {
    if (col == board.length) {
        result.add(construct(board));
        return;
    }
    
    for (int row = 0; row < board.length; row++) {
        if (isSafe(row, col, board)) {
            board[row][col] = 'Q';
            solve(col + 1, board, result);
            board[row][col] = '.';
        }
    }
}

private boolean isSafe(int row, int col, char[][] board) {
    // Check row
    for (int j = 0; j < col; j++) {
        if (board[row][j] == 'Q') return false;
    }
    
    // Check upper diagonal
    for (int i = row, j = col; i >= 0 && j >= 0; i--, j--) {
        if (board[i][j] == 'Q') return false;
    }
    
    // Check lower diagonal
    for (int i = row, j = col; i < board.length && j >= 0; i++, j--) {
        if (board[i][j] == 'Q') return false;
    }
    
    return true;
}

private List<String> construct(char[][] board) {
    List<String> solution = new ArrayList<>();
    for (char[] row : board) {
        solution.add(new String(row));
    }
    return solution;
}`,
        timeComplexity: "O(n!)",
        spaceComplexity: "O(n²)",
        explanation: "We try placing queens column by column and check if each placement is safe by examining rows and diagonals."
      },
      {
        approach: "Optimal",
        code: `public List<List<String>> solveNQueens(int n) {
    List<List<String>> result = new ArrayList<>();
    int[] queens = new int[n];
    Arrays.fill(queens, -1);
    
    Set<Integer> columns = new HashSet<>();
    Set<Integer> diagonals1 = new HashSet<>();
    Set<Integer> diagonals2 = new HashSet<>();
    
    backtrack(result, queens, n, 0, columns, diagonals1, diagonals2);
    return result;
}

private void backtrack(List<List<String>> result, int[] queens, int n, int row,
                      Set<Integer> columns, Set<Integer> diagonals1,
                      Set<Integer> diagonals2) {
    if (row == n) {
        result.add(generateBoard(queens, n));
        return;
    }
    
    for (int col = 0; col < n; col++) {
        int diagonal1 = row - col;
        int diagonal2 = row + col;
        
        if (columns.contains(col) ||
            diagonals1.contains(diagonal1) ||
            diagonals2.contains(diagonal2)) {
            continue;
        }
        
        queens[row] = col;
        columns.add(col);
        diagonals1.add(diagonal1);
        diagonals2.add(diagonal2);
        
        backtrack(result, queens, n, row + 1, columns, diagonals1, diagonals2);
        
        queens[row] = -1;
        columns.remove(col);
        diagonals1.remove(diagonal1);
        diagonals2.remove(diagonal2);
    }
}

private List<String> generateBoard(int[] queens, int n) {
    List<String> board = new ArrayList<>();
    for (int i = 0; i < n; i++) {
        char[] row = new char[n];
        Arrays.fill(row, '.');
        row[queens[i]] = 'Q';
        board.add(new String(row));
    }
    return board;
}`,
        timeComplexity: "O(n!)",
        spaceComplexity: "O(n)",
        explanation: "We use sets to track occupied columns and diagonals, which makes checking valid positions O(1) instead of O(n)."
      }
    ],
    leetCodeUrl: "https://leetcode.com/problems/n-queens/",
    difficulty: "Hard",
    category: "backtracking"
  },
  {
    id: 70,
    title: "Word Search",
    description: "Given an m x n grid of characters board and a string word, return true if word exists in the grid. The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.",
    examples: [
      {
        input: `board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"`,
        output: "true"
      },
      {
        input: `board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"`,
        output: "true"
      }
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public boolean exist(char[][] board, String word) {
    int m = board.length;
    int n = board[0].length;
    
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (board[i][j] == word.charAt(0)) {
                boolean[][] visited = new boolean[m][n];
                if (search(board, word, i, j, 0, visited)) {
                    return true;
                }
            }
        }
    }
    
    return false;
}

private boolean search(char[][] board, String word, int i, int j, 
                      int index, boolean[][] visited) {
    if (index == word.length()) return true;
    
    if (i < 0 || i >= board.length || j < 0 || j >= board[0].length ||
        visited[i][j] || board[i][j] != word.charAt(index)) {
        return false;
    }
    
    visited[i][j] = true;
    
    boolean found = search(board, word, i+1, j, index+1, visited) ||
                   search(board, word, i-1, j, index+1, visited) ||
                   search(board, word, i, j+1, index+1, visited) ||
                   search(board, word, i, j-1, index+1, visited);
    
    visited[i][j] = false;
    
    return found;
}`,
        timeComplexity: "O(m*n*4^L) where L is length of word",
        spaceComplexity: "O(m*n)",
        explanation: "We try each cell as starting point and use DFS with backtracking to find the word. We use a visited array to avoid using same cell twice."
      },
      {
        approach: "Optimal",
        code: `public boolean exist(char[][] board, String word) {
    int m = board.length;
    int n = board[0].length;
    
    // Start from cells that match first character
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (board[i][j] == word.charAt(0)) {
                if (search(board, word, i, j, 0)) {
                    return true;
                }
            }
        }
    }
    
    return false;
}

private boolean search(char[][] board, String word, int i, int j, int index) {
    if (index == word.length()) return true;
    
    if (i < 0 || i >= board.length || j < 0 || j >= board[0].length ||
        board[i][j] != word.charAt(index)) {
        return false;
    }
    
    char temp = board[i][j];
    board[i][j] = '#';  // mark as visited
    
    boolean found = search(board, word, i+1, j, index+1) ||
                   search(board, word, i-1, j, index+1) ||
                   search(board, word, i, j+1, index+1) ||
                   search(board, word, i, j-1, index+1);
    
    board[i][j] = temp;  // restore original character
    
    return found;
}`,
        timeComplexity: "O(m*n*4^L)",
        spaceComplexity: "O(L)",
        explanation: "We modify the board in-place to mark visited cells instead of using a separate visited array. This saves space and improves cache performance."
      }
    ],
    leetCodeUrl: "https://leetcode.com/problems/word-search/",
    difficulty: "Medium",
    category: "backtracking"
  },
  {
    id: 71,
    title: "Palindrome Partitioning",
    description: "Given a string s, partition s such that every substring of the partition is a palindrome. Return all possible palindrome partitioning of s.",
    examples: [
      {
        input: "s = \"aab\"",
        output: "[[\"a\",\"a\",\"b\"],[\"aa\",\"b\"]]"
      },
      {
        input: "s = \"a\"",
        output: "[[\"a\"]]"
      }
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public List<List<String>> partition(String s) {
    List<List<String>> result = new ArrayList<>();
    partition(s, 0, new ArrayList<>(), result);
    return result;
}

private void partition(String s, int start, List<String> current,
                      List<List<String>> result) {
    if (start >= s.length()) {
        result.add(new ArrayList<>(current));
        return;
    }
    
    for (int i = start; i < s.length(); i++) {
        String substring = s.substring(start, i + 1);
        if (isPalindrome(substring)) {
            current.add(substring);
            partition(s, i + 1, current, result);
            current.remove(current.size() - 1);
        }
    }
}

private boolean isPalindrome(String s) {
    int left = 0;
    int right = s.length() - 1;
    while (left < right) {
        if (s.charAt(left++) != s.charAt(right--)) {
            return false;
        }
    }
    return true;
}`,
        timeComplexity: "O(n*2^n)",
        spaceComplexity: "O(n)",
        explanation: "We try all possible partitions and check if each substring is a palindrome."
      },
      {
        approach: "Optimal",
        code: `public List<List<String>> partition(String s) {
    int len = s.length();
    boolean[][] dp = new boolean[len][len];
    List<List<String>> result = new ArrayList<>();
    
    // Pre-compute palindrome information
    for (int i = 0; i < len; i++) {
        for (int j = 0; j <= i; j++) {
            if (s.charAt(i) == s.charAt(j) && (i - j <= 2 || dp[j+1][i-1])) {
                dp[j][i] = true;
            }
        }
    }
    
    backtrack(s, 0, dp, new ArrayList<>(), result);
    return result;
}

private void backtrack(String s, int start, boolean[][] dp, 
                      List<String> current, List<List<String>> result) {
    if (start >= s.length()) {
        result.add(new ArrayList<>(current));
        return;
    }
    
    for (int i = start; i < s.length(); i++) {
        if (dp[start][i]) {
            current.add(s.substring(start, i + 1));
            backtrack(s, i + 1, dp, current, result);
            current.remove(current.size() - 1);
        }
    }
}`,
        timeComplexity: "O(n*2^n)",
        spaceComplexity: "O(n²)",
        explanation: "We use dynamic programming to pre-compute palindrome information, which makes palindrome checking O(1) instead of O(n)."
      }
    ],
    leetCodeUrl: "https://leetcode.com/problems/palindrome-partitioning/",
    difficulty: "Medium",
    category: "backtracking"
  }
];