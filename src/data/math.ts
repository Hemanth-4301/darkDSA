import { Question } from "../types";

export const mathQuestions: Question[] = [
  {
    id: 106,
    title: "Rotate Image",
    description:
      "You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise). You have to rotate the image in-place, which means you have to modify the input 2D matrix directly. DO NOT allocate another 2D matrix and do the rotation.",
    examples: [
      {
        input: "matrix = [[1,2,3],[4,5,6],[7,8,9]]",
        output: "[[7,4,1],[8,5,2],[9,6,3]]",
      },
      {
        input: "matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]",
        output: "[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]",
      },
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public void rotate(int[][] matrix) {
    int n = matrix.length;
    int[][] temp = new int[n][n];
    
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            temp[j][n-1-i] = matrix[i][j];
        }
    }
    
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            matrix[i][j] = temp[i][j];
        }
    }
}`,
        timeComplexity: "O(n²)",
        spaceComplexity: "O(n²)",
        explanation:
          "We create a new matrix and copy rotated elements to it, then copy back to original matrix.",
      },
      {
        approach: "Optimal",
        code: `public void rotate(int[][] matrix) {
    int n = matrix.length;
    
    // Transpose matrix
    for (int i = 0; i < n; i++) {
        for (int j = i; j < n; j++) {
            int temp = matrix[i][j];
            matrix[i][j] = matrix[j][i];
            matrix[j][i] = temp;
        }
    }
    
    // Reverse each row
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n/2; j++) {
            int temp = matrix[i][j];
            matrix[i][j] = matrix[i][n-1-j];
            matrix[i][n-1-j] = temp;
        }
    }
}`,
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        explanation:
          "We first transpose the matrix (swap elements across diagonal), then reverse each row.",
      },
    ],
    leetCodeUrl: "https://leetcode.com/problems/rotate-image/",
    difficulty: "Medium",
    category: "math",
  },
  {
    id: 107,
    title: "Spiral Matrix",
    description:
      "Given an m x n matrix, return all elements of the matrix in spiral order.",
    examples: [
      {
        input: "matrix = [[1,2,3],[4,5,6],[7,8,9]]",
        output: "[1,2,3,6,9,8,7,4,5]",
      },
      {
        input: "matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]",
        output: "[1,2,3,4,8,12,11,10,9,5,6,7]",
      },
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public List<Integer> spiralOrder(int[][] matrix) {
    List<Integer> result = new ArrayList<>();
    if (matrix == null || matrix.length == 0) return result;
    
    int m = matrix.length, n = matrix[0].length;
    boolean[][] seen = new boolean[m][n];
    int[] dr = {0, 1, 0, -1};
    int[] dc = {1, 0, -1, 0};
    int r = 0, c = 0, di = 0;
    
    for (int i = 0; i < m * n; i++) {
        result.add(matrix[r][c]);
        seen[r][c] = true;
        
        int newR = r + dr[di];
        int newC = c + dc[di];
        
        if (0 <= newR && newR < m && 0 <= newC && newC < n && 
            !seen[newR][newC]) {
            r = newR;
            c = newC;
        } else {
            di = (di + 1) % 4;
            r += dr[di];
            c += dc[di];
        }
    }
    
    return result;
}`,
        timeComplexity: "O(m*n)",
        spaceComplexity: "O(m*n)",
        explanation:
          "We use a visited array and change direction when we hit a boundary or visited cell.",
      },
      {
        approach: "Optimal",
        code: `public List<Integer> spiralOrder(int[][] matrix) {
    List<Integer> result = new ArrayList<>();
    if (matrix == null || matrix.length == 0) return result;
    
    int top = 0;
    int bottom = matrix.length - 1;
    int left = 0;
    int right = matrix[0].length - 1;
    
    while (top <= bottom && left <= right) {
        // Traverse right
        for (int j = left; j <= right; j++) {
            result.add(matrix[top][j]);
        }
        top++;
        
        // Traverse down
        for (int i = top; i <= bottom; i++) {
            result.add(matrix[i][right]);
        }
        right--;
        
        if (top <= bottom) {
            // Traverse left
            for (int j = right; j >= left; j--) {
                result.add(matrix[bottom][j]);
            }
        }
        bottom--;
        
        if (left <= right) {
            // Traverse up
            for (int i = bottom; i >= top; i--) {
                result.add(matrix[i][left]);
            }
        }
        left++;
    }
    
    return result;
}`,
        timeComplexity: "O(m*n)",
        spaceComplexity: "O(1)",
        explanation:
          "We maintain four boundaries and traverse the matrix in spiral order by updating these boundaries.",
      },
    ],
    leetCodeUrl: "https://leetcode.com/problems/spiral-matrix/",
    difficulty: "Medium",
    category: "math",
  },
  {
    id: 108,
    title: "Set Matrix Zeroes",
    description:
      "Given an m x n integer matrix matrix, if an element is 0, set its entire row and column to 0's. You must do it in place.",
    examples: [
      {
        input: "matrix = [[1,1,1],[1,0,1],[1,1,1]]",
        output: "[[1,0,1],[0,0,0],[1,0,1]]",
      },
      {
        input: "matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]",
        output: "[[0,0,0,0],[0,4,5,0],[0,3,1,0]]",
      },
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public void setZeroes(int[][] matrix) {
    int m = matrix.length;
    int n = matrix[0].length;
    Set<Integer> rows = new HashSet<>();
    Set<Integer> cols = new HashSet<>();
    
    // Mark rows and columns that need to be set to zero
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (matrix[i][j] == 0) {
                rows.add(i);
                cols.add(j);
            }
        }
    }
    
    // Set rows to zero
    for (int row : rows) {
        for (int j = 0; j < n; j++) {
            matrix[row][j] = 0;
        }
    }
    
    // Set columns to zero
    for (int col : cols) {
        for (int i = 0; i < m; i++) {
            matrix[i][col] = 0;
        }
    }
}`,
        timeComplexity: "O(m*n)",
        spaceComplexity: "O(m+n)",
        explanation:
          "We use two sets to store which rows and columns need to be zeroed.",
      },
      {
        approach: "Optimal",
        code: `public void setZeroes(int[][] matrix) {
    int m = matrix.length;
    int n = matrix[0].length;
    boolean firstRowZero = false;
    boolean firstColZero = false;
    
    // Check if first row needs to be set to zero
    for (int j = 0; j < n; j++) {
        if (matrix[0][j] == 0) {
            firstRowZero = true;
            break;
        }
    }
    
    // Check if first column needs to be set to zero
    for (int i = 0; i < m; i++) {
        if (matrix[i][0] == 0) {
            firstColZero = true;
            break;
        }
    }
    
    // Use first row and column as markers
    for (int i = 1; i < m; i++) {
        for (int j = 1; j < n; j++) {
            if (matrix[i][j] == 0) {
                matrix[i][0] = 0;
                matrix[0][j] = 0;
            }
        }
    }
    
    // Set rows to zero
    for (int i = 1; i < m; i++) {
        if (matrix[i][0] == 0) {
            for (int j = 1; j < n; j++) {
                matrix[i][j] = 0;
            }
        }
    }
    
    // Set columns to zero
    for (int j = 1; j < n; j++) {
        if (matrix[0][j] == 0) {
            for (int i = 1; i < m; i++) {
                matrix[i][j] = 0;
            }
        }
    }
    
    // Set first row to zero if needed
    if (firstRowZero) {
        for (int j = 0; j < n; j++) {
            matrix[0][j] = 0;
        }
    }
    
    // Set first column to zero if needed
    if (firstColZero) {
        for (int i = 0; i < m; i++) {
            matrix[i][0] = 0;
        }
    }
}`,
        timeComplexity: "O(m*n)",
        spaceComplexity: "O(1)",
        explanation:
          "We use the first row and column as markers for which rows and columns need to be zeroed.",
      },
    ],
    leetCodeUrl: "https://leetcode.com/problems/set-matrix-zeroes/",
    difficulty: "Medium",
    category: "math",
  },
  {
    id: 109,
    title: "Happy Number",
    description:
      "Write an algorithm to determine if a number n is happy. A happy number is a number defined by the following process: Starting with any positive integer, replace the number by the sum of the squares of its digits, and repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1. Those numbers for which this process ends in 1 are happy numbers.",
    examples: [
      {
        input: "n = 19",
        output: "true",
        explanation:
          "1² + 9² = 82, 8² + 2² = 68, 6² + 8² = 100, 1² + 0² + 0² = 1",
      },
      {
        input: "n = 2",
        output: "false",
      },
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public boolean isHappy(int n) {
    Set<Integer> seen = new HashSet<>();
    
    while (n != 1 && !seen.contains(n)) {
        seen.add(n);
        n = getNext(n);
    }
    
    return n == 1;
}

private int getNext(int n) {
    int sum = 0;
    while (n > 0) {
        int digit = n % 10;
        sum += digit * digit;
        n /= 10;
    }
    return sum;
}`,
        timeComplexity: "O(log n)",
        spaceComplexity: "O(log n)",
        explanation:
          "We use a HashSet to detect cycles. If we encounter a number we've seen before, it's not happy.",
      },
      {
        approach: "Optimal",
        code: `public boolean isHappy(int n) {
    int slow = n;
    int fast = getNext(n);
    
    while (fast != 1 && slow != fast) {
        slow = getNext(slow);
        fast = getNext(getNext(fast));
    }
    
    return fast == 1;
}

private int getNext(int n) {
    int sum = 0;
    while (n > 0) {
        int digit = n % 10;
        sum += digit * digit;
        n /= 10;
    }
    return sum;
}`,
        timeComplexity: "O(log n)",
        spaceComplexity: "O(1)",
        explanation:
          "We use Floyd's Cycle-Finding Algorithm (tortoise and hare) to detect cycles without using extra space.",
      },
    ],
    leetCodeUrl: "https://leetcode.com/problems/happy-number/",
    difficulty: "Easy",
    category: "math",
  },
  {
    id: 110,
    title: "Plus One",
    description:
      "You are given a large integer represented as an integer array digits, where each digits[i] is the ith digit of the integer. The digits are ordered from most significant to least significant in left-to-right order. The large integer does not contain any leading 0's. Increment the large integer by one and return the resulting array of digits.",
    examples: [
      {
        input: "digits = [1,2,3]",
        output: "[1,2,4]",
        explanation:
          "The array represents the integer 123. Incrementing by one gives 123 + 1 = 124. Thus, the result should be [1,2,4].",
      },
      {
        input: "digits = [9]",
        output: "[1,0]",
        explanation:
          "The array represents the integer 9. Incrementing by one gives 9 + 1 = 10. Thus, the result should be [1,0].",
      },
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public int[] plusOne(int[] digits) {
    StringBuilder num = new StringBuilder();
    for (int digit : digits) {
        num.append(digit);
    }
    
    String result = String.valueOf(Long.parseLong(num.toString()) + 1);
    int[] answer = new int[result.length()];
    
    for (int i = 0; i < result.length(); i++) {
        answer[i] = result.charAt(i) - '0';
    }
    
    return answer;
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        explanation:
          "We convert array to number, add one, then convert back to array. This might not work for very large numbers.",
      },
      {
        approach: "Optimal",
        code: `public int[] plusOne(int[] digits) {
    for (int i = digits.length - 1; i >= 0; i--) {
        if (digits[i] < 9) {
            digits[i]++;
            return digits;
        }
        digits[i] = 0;
    }
    
    int[] result = new int[digits.length + 1];
    result[0] = 1;
    return result;
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        explanation:
          "We iterate from right to left. If digit is less than 9, increment it and return. Otherwise, set to 0 and continue. If all digits were 9, create new array with leading 1.",
      },
    ],
    leetCodeUrl: "https://leetcode.com/problems/plus-one/",
    difficulty: "Easy",
    category: "math",
  },
];
