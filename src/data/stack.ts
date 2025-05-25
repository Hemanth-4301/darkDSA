import { Question } from "../types";

export const stackQuestions: Question[] = [
  {
    id: 24,
    title: "Valid Parentheses",
    description:
      "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.",
    examples: [
      {
        input: 's = "()"',
        output: "true",
      },
      {
        input: 's = "()[]{}"',
        output: "true",
      },
      {
        input: 's = "(]"',
        output: "false",
      },
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `class Solution {
    public boolean isValid(String s) {
        // Replace pairs repeatedly until no more pairs
        while (s.contains("()") || s.contains("[]") || s.contains("{}")) {
            s = s.replace("()", "");
            s = s.replace("[]", "");
            s = s.replace("{}", "");
        }
        return s.isEmpty();
    }
}`,
        timeComplexity: "O(n²)",
        spaceComplexity: "O(n)",
        explanation:
          "Repeatedly scan string to replace pairs, potentially n/2 iterations each taking O(n) time.",
      },
      {
        approach: "Optimal",
        code: `class Solution {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        
        for (char c : s.toCharArray()) {
            if (c == '(' || c == '[' || c == '{') {
                stack.push(c);
            } else {
                if (stack.isEmpty()) return false;
                
                char top = stack.pop();
                if ((c == ')' && top != '(') ||
                    (c == ']' && top != '[') ||
                    (c == '}' && top != '{')) {
                    return false;
                }
            }
        }
        
        return stack.isEmpty();
    }
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        explanation:
          "Single pass using stack to match opening and closing brackets.",
      },
    ],
    leetCodeUrl: "https://leetcode.com/problems/valid-parentheses/",
    difficulty: "Easy",
    category: "stack",
  },
  {
    id: 25,
    title: "Min Stack",
    description:
      "Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.\n\nImplement the MinStack class:\n- MinStack() initializes the stack object.\n- void push(int val) pushes the element val onto the stack.\n- void pop() removes the element on the top of the stack.\n- int top() gets the top element of the stack.\n- int getMin() retrieves the minimum element in the stack.\n\nYou must implement a solution with O(1) time complexity for each function.",
    examples: [
      {
        input:
          '["MinStack","push","push","push","getMin","pop","top","getMin"]\n[[],[-2],[0],[-3],[],[],[],[]]',
        output: "[null,null,null,null,-3,null,0,-2]",
        explanation:
          "MinStack minStack = new MinStack();\nminStack.push(-2);\nminStack.push(0);\nminStack.push(-3);\nminStack.getMin(); // return -3\nminStack.pop();\nminStack.top();    // return 0\nminStack.getMin(); // return -2",
      },
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `class MinStack {
    private Stack<Integer> stack;
    
    public MinStack() {
        stack = new Stack<>();
    }
    
    public void push(int val) {
        stack.push(val);
    }
    
    public void pop() {
        stack.pop();
    }
    
    public int top() {
        return stack.peek();
    }
    
    public int getMin() {
        // Linear search for minimum
        int min = Integer.MAX_VALUE;
        for (int val : stack) {
            min = Math.min(min, val);
        }
        return min;
    }
}`,
        timeComplexity: "O(n) for getMin(), O(1) for others",
        spaceComplexity: "O(n)",
        explanation: "getMin() requires linear scan through entire stack.",
      },
      {
        approach: "Optimal",
        code: `class MinStack {
    private Stack<Integer> stack;
    private Stack<Integer> minStack;
    
    public MinStack() {
        stack = new Stack<>();
        minStack = new Stack<>();
    }
    
    public void push(int val) {
        stack.push(val);
        
        // Push to minStack if it's empty or val is <= current min
        if (minStack.isEmpty() || val <= minStack.peek()) {
            minStack.push(val);
        }
    }
    
    public void pop() {
        int popped = stack.pop();
        
        // If popped element was the minimum, remove from minStack
        if (popped == minStack.peek()) {
            minStack.pop();
        }
    }
    
    public int top() {
        return stack.peek();
    }
    
    public int getMin() {
        return minStack.peek();
    }
}`,
        timeComplexity: "O(1) for all operations",
        spaceComplexity: "O(n)",
        explanation:
          "Additional stack tracks minimums, all operations are O(1).",
      },
    ],
    leetCodeUrl: "https://leetcode.com/problems/min-stack/",
    difficulty: "Medium",
    category: "stack",
  },
  {
    id: 26,
    title: "Evaluate Reverse Polish Notation",
    description:
      "Evaluate the value of an arithmetic expression in Reverse Polish Notation.\n\nValid operators are +, -, *, and /. Each operand may be an integer or another expression.\n\nNote that division between two integers should truncate toward zero.\n\nIt is guaranteed that the given RPN expression is always valid. That means the expression would always evaluate to a result, and there will not be any division by zero operation.",
    examples: [
      {
        input: 'tokens = ["2","1","+","3","*"]',
        output: "9",
        explanation: "((2 + 1) * 3) = 9",
      },
      {
        input: 'tokens = ["4","13","5","/","+"]',
        output: "6",
        explanation: "(4 + (13 / 5)) = 6",
      },
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `class Solution {
    public int evalRPN(String[] tokens) {
        // Recursively find and evaluate innermost expressions
        List<String> tokenList = new ArrayList<>(Arrays.asList(tokens));
        
        while (tokenList.size() > 1) {
            for (int i = 0; i < tokenList.size(); i++) {
                String token = tokenList.get(i);
                if (isOperator(token)) {
                    int b = Integer.parseInt(tokenList.get(i - 1));
                    int a = Integer.parseInt(tokenList.get(i - 2));
                    int result = calculate(a, b, token);
                    
                    // Replace a, b, operator with result
                    tokenList.set(i - 2, String.valueOf(result));
                    tokenList.remove(i - 1);
                    tokenList.remove(i - 1);
                    break;
                }
            }
        }
        
        return Integer.parseInt(tokenList.get(0));
    }
    
    private boolean isOperator(String token) {
        return token.equals("+") || token.equals("-") || 
               token.equals("*") || token.equals("/");
    }
    
    private int calculate(int a, int b, String op) {
        switch (op) {
            case "+": return a + b;
            case "-": return a - b;
            case "*": return a * b;
            case "/": return a / b;
            default: return 0;
        }
    }
}`,
        timeComplexity: "O(n²)",
        spaceComplexity: "O(n)",
        explanation:
          "For each operator, potentially scan entire array and perform list operations.",
      },
      {
        approach: "Optimal",
        code: `class Solution {
    public int evalRPN(String[] tokens) {
        Stack<Integer> stack = new Stack<>();
        
        for (String token : tokens) {
            if (isOperator(token)) {
                int b = stack.pop();
                int a = stack.pop();
                int result = calculate(a, b, token);
                stack.push(result);
            } else {
                stack.push(Integer.parseInt(token));
            }
        }
        
        return stack.pop();
    }
    
    private boolean isOperator(String token) {
        return token.equals("+") || token.equals("-") || 
               token.equals("*") || token.equals("/");
    }
    
    private int calculate(int a, int b, String op) {
        switch (op) {
            case "+": return a + b;
            case "-": return a - b;
            case "*": return a * b;
            case "/": return a / b;
            default: return 0;
        }
    }
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        explanation:
          "Single pass using stack to store operands and evaluate operators.",
      },
    ],
    leetCodeUrl:
      "https://leetcode.com/problems/evaluate-reverse-polish-notation/",
    difficulty: "Medium",
    category: "stack",
  },
  {
    id: 27,
    title: "Generate Parentheses",
    description:
      "Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.",
    examples: [
      {
        input: "n = 3",
        output: '["((()))","(()())","(())()","()(())","()()()"]',
      },
      {
        input: "n = 1",
        output: '["()"]',
      },
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `class Solution {
    public List<String> generateParenthesis(int n) {
        List<String> result = new ArrayList<>();
        generateAll(new char[2 * n], 0, result);
        return result;
    }
    
    private void generateAll(char[] current, int pos, List<String> result) {
        if (pos == current.length) {
            if (isValid(current)) {
                result.add(new String(current));
            }
        } else {
            current[pos] = '(';
            generateAll(current, pos + 1, result);
            current[pos] = ')';
            generateAll(current, pos + 1, result);
        }
    }
    
    private boolean isValid(char[] current) {
        int balance = 0;
        for (char c : current) {
            if (c == '(') {
                balance++;
            } else {
                balance--;
            }
            if (balance < 0) return false;
        }
        return balance == 0;
    }
}`,
        timeComplexity: "O(2^(2n) * n)",
        spaceComplexity: "O(2^(2n) * n)",
        explanation:
          "Generate all 2^(2n) possible strings and validate each one.",
      },
      {
        approach: "Optimal",
        code: `class Solution {
    public List<String> generateParenthesis(int n) {
        List<String> result = new ArrayList<>();
        backtrack(result, "", 0, 0, n);
        return result;
    }
    
    private void backtrack(List<String> result, String current, 
                          int open, int close, int max) {
        if (current.length() == max * 2) {
            result.add(current);
            return;
        }
        
        if (open < max) {
            backtrack(result, current + "(", open + 1, close, max);
        }
        if (close < open) {
            backtrack(result, current + ")", open, close + 1, max);
        }
    }
}`,
        timeComplexity: "O(4^n / √n)",
        spaceComplexity: "O(4^n / √n)",
        explanation:
          "Backtracking with pruning generates only valid combinations (Catalan number).",
      },
    ],
    leetCodeUrl: "https://leetcode.com/problems/generate-parentheses/",
    difficulty: "Medium",
    category: "stack",
  },
  {
    id: 28,
    title: "Daily Temperatures",
    description:
      "Given an array of integers temperatures represents the daily temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature. If there is no future day for which this is possible, keep answer[i] == 0 instead.",
    examples: [
      {
        input: "temperatures = [73,74,75,71,69,72,76,73]",
        output: "[1,1,4,2,1,1,0,0]",
      },
      {
        input: "temperatures = [30,40,50,60]",
        output: "[1,1,1,0]",
      },
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `class Solution {
    public int[] dailyTemperatures(int[] temperatures) {
        int n = temperatures.length;
        int[] result = new int[n];
        
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (temperatures[j] > temperatures[i]) {
                    result[i] = j - i;
                    break;
                }
            }
        }
        
        return result;
    }
}`,
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        explanation:
          "For each day, search forward until finding a warmer temperature.",
      },
      {
        approach: "Optimal",
        code: `class Solution {
    public int[] dailyTemperatures(int[] temperatures) {
        int n = temperatures.length;
        int[] result = new int[n];
        Stack<Integer> stack = new Stack<>();
        
        for (int i = 0; i < n; i++) {
            // Pop indices with temperatures lower than current
            while (!stack.isEmpty() && 
                   temperatures[i] > temperatures[stack.peek()]) {
                int prevIndex = stack.pop();
                result[prevIndex] = i - prevIndex;
            }
            
            stack.push(i);
        }
        
        return result;
    }
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        explanation:
          "Monotonic stack processes each element once, maintaining decreasing temperatures.",
      },
    ],
    leetCodeUrl: "https://leetcode.com/problems/daily-temperatures/",
    difficulty: "Medium",
    category: "stack",
  },
  {
    id: 29,
    title: "Car Fleet",
    description:
      "There are n cars going to the same destination along a one-lane road. The destination is target miles away.\n\nYou are given two integer arrays position and speed, both of length n, where position[i] is the position of the ith car and speed[i] is the speed of the ith car (in miles per hour).\n\nA car can never pass another car ahead of it, but it can catch up to it and drive bumper to bumper at the same speed. The faster car will slow down to match the slower car's speed. The distance between these two cars is ignored (i.e., they are assumed to have the same position).\n\nA car fleet is some non-empty set of cars driving at the same position and same speed. Note that a single car is also a car fleet.\n\nIf a car catches up to a car fleet right at the destination point, it will still be considered as one car fleet.\n\nReturn the number of car fleets that will arrive at the destination.",
    examples: [
      {
        input: "target = 12, position = [10,8,0,5,3], speed = [2,4,1,1,3]",
        output: "3",
        explanation:
          "The cars starting at 10 (speed 2) and 8 (speed 4) become a fleet, meeting each other at 12. The car starting at 0 does not catch up to any other car, so it is a fleet by itself. The cars starting at 5 (speed 1) and 3 (speed 3) become a fleet, meeting each other at 6. Note that no other cars meet these fleets before the destination, so the answer is 3.",
      },
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `class Solution {
    public int carFleet(int target, int[] position, int[] speed) {
        int n = position.length;
        if (n == 0) return 0;
        
        // Create array of cars with position and time to reach target
        double[][] cars = new double[n][2];
        for (int i = 0; i < n; i++) {
            cars[i][0] = position[i];
            cars[i][1] = (double)(target - position[i]) / speed[i];
        }
        
        // Sort by position (closest to target first)
        Arrays.sort(cars, (a, b) -> Double.compare(b[0], a[0]));
        
        int fleets = 0;
        double maxTime = 0;
        
        for (double[] car : cars) {
            double timeToReach = car[1];
            if (timeToReach > maxTime) {
                fleets++;
                maxTime = timeToReach;
            }
        }
        
        return fleets;
    }
}`,
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(n)",
        explanation: "Sort cars by position, then single pass to count fleets.",
      },
      {
        approach: "Optimal",
        code: `class Solution {
    public int carFleet(int target, int[] position, int[] speed) {
        int n = position.length;
        if (n == 0) return 0;
        
        // Create array of cars with position and time to reach target
        double[][] cars = new double[n][2];
        for (int i = 0; i < n; i++) {
            cars[i][0] = position[i];
            cars[i][1] = (double)(target - position[i]) / speed[i];
        }
        
        // Sort by position (closest to target first)
        Arrays.sort(cars, (a, b) -> Double.compare(b[0], a[0]));
        
        Stack<Double> stack = new Stack<>();
        
        for (double[] car : cars) {
            double timeToReach = car[1];
            
            // If current car takes longer time, it forms a new fleet
            if (stack.isEmpty() || timeToReach > stack.peek()) {
                stack.push(timeToReach);
            }
            // Otherwise, it joins the fleet ahead (no push needed)
        }
        
        return stack.size();
    }
}`,
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(n)",
        explanation:
          "Same approach but using stack to track fleet formation more clearly.",
      },
    ],
    leetCodeUrl: "https://leetcode.com/problems/car-fleet/",
    difficulty: "Medium",
    category: "stack",
  },
  {
    id: 30,
    title: "Largest Rectangle in Histogram",
    description:
      "Given an array of integers heights representing the histogram's bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.",
    examples: [
      {
        input: "heights = [2,1,5,6,2,3]",
        output: "10",
        explanation:
          "The above is a histogram where width of each bar is 1. The largest rectangle is shown in the red area, which has an area = 10 units.",
      },
      {
        input: "heights = [2,4]",
        output: "4",
      },
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `class Solution {
    public int largestRectangleArea(int[] heights) {
        int maxArea = 0;
        int n = heights.length;
        
        for (int i = 0; i < n; i++) {
            int minHeight = heights[i];
            for (int j = i; j < n; j++) {
                minHeight = Math.min(minHeight, heights[j]);
                int width = j - i + 1;
                int area = minHeight * width;
                maxArea = Math.max(maxArea, area);
            }
        }
        
        return maxArea;
    }
}`,
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        explanation:
          "For each starting position, extend rectangle and track minimum height.",
      },
      {
        approach: "Optimal",
        code: `class Solution {
    public int largestRectangleArea(int[] heights) {
        Stack<Integer> stack = new Stack<>();
        int maxArea = 0;
        int n = heights.length;
        
        for (int i = 0; i <= n; i++) {
            int currentHeight = (i == n) ? 0 : heights[i];
            
            while (!stack.isEmpty() && heights[stack.peek()] > currentHeight) {
                int height = heights[stack.pop()];
                int width = stack.isEmpty() ? i : i - stack.peek() - 1;
                maxArea = Math.max(maxArea, height * width);
            }
            
            stack.push(i);
        }
        
        return maxArea;
    }
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        explanation:
          "Monotonic stack to find previous and next smaller elements efficiently.",
      },
    ],
    leetCodeUrl:
      "https://leetcode.com/problems/largest-rectangle-in-histogram/",
    difficulty: "Hard",
    category: "stack",
  },
];
