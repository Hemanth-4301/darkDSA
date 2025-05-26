import { Question } from "../types";

export const stackQuestions: Question[] = [
  {
    id: 24,
    title: "Valid Parentheses",
    description:
      "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if: Open brackets must be closed by the same type of brackets, and open brackets must be closed in the correct order.",
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
        code: `public boolean isValid(String s) {
    while (s.contains("()") || s.contains("[]") || s.contains("{}")) {
        s = s.replace("()", "")
         .replace("[]", "")
         .replace("{}", "");
    }
    return s.isEmpty();
}`,
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        explanation:
          "We repeatedly remove matching pairs of parentheses until no more can be removed. If the string is empty at the end, it was valid.",
      },
      {
        approach: "Optimal",
        code: `public boolean isValid(String s) {
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
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        explanation:
          "We use a stack to keep track of opening brackets. When we encounter a closing bracket, we check if it matches the most recent opening bracket.",
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
      "Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.",
    examples: [
      {
        input: `MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin(); // return -3
minStack.pop();
minStack.top();    // return 0
minStack.getMin(); // return -2`,
        output: "[-3,0,-2]",
        explanation: "Each operation returns the expected result.",
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
        return stack.stream().min(Integer::compare).get();
    }
}`,
        timeComplexity: "O(n) for getMin, O(1) for others",
        spaceComplexity: "O(n)",
        explanation:
          "We use a regular stack and find the minimum by scanning through all elements when needed.",
      },
      {
        approach: "Optimal",
        code: `class MinStack {
    private Stack<int[]> stack;
    
    public MinStack() {
        stack = new Stack<>();
    }
    
    public void push(int val) {
        int min = stack.isEmpty() ? val : Math.min(val, stack.peek()[1]);
        stack.push(new int[]{val, min});
    }
    
    public void pop() {
        stack.pop();
    }
    
    public int top() {
        return stack.peek()[0];
    }
    
    public int getMin() {
        return stack.peek()[1];
    }
}`,
        timeComplexity: "O(1) for all operations",
        spaceComplexity: "O(n)",
        explanation:
          "We store each value along with the minimum value up to that point. This allows us to retrieve the minimum in constant time.",
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
      "Evaluate the value of an arithmetic expression in Reverse Polish Notation. Valid operators are +, -, *, and /. Each operand may be an integer or another expression.",
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
        code: `public int evalRPN(String[] tokens) {
    if (tokens.length == 1) {
        return Integer.parseInt(tokens[0]);
    }
    
    for (int i = 0; i < tokens.length; i++) {
        if (isOperator(tokens[i])) {
            int b = Integer.parseInt(tokens[i-1]);
            int a = Integer.parseInt(tokens[i-2]);
            int result = evaluate(a, b, tokens[i]);
            
            tokens[i] = String.valueOf(result);
            tokens[i-1] = tokens[i];
            tokens[i-2] = tokens[i];
        }
    }
    
    return Integer.parseInt(tokens[tokens.length-1]);
}

private boolean isOperator(String token) {
    return token.equals("+") || token.equals("-") || 
           token.equals("*") || token.equals("/");
}

private int evaluate(int a, int b, String operator) {
    switch (operator) {
        case "+": return a + b;
        case "-": return a - b;
        case "*": return a * b;
        case "/": return a / b;
        default: return 0;
    }
}`,
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        explanation:
          "We modify the array in place, replacing operators and their operands with the result of the operation.",
      },
      {
        approach: "Optimal",
        code: `public int evalRPN(String[] tokens) {
    Stack<Integer> stack = new Stack<>();
    
    for (String token : tokens) {
        if (!isOperator(token)) {
            stack.push(Integer.parseInt(token));
        } else {
            int b = stack.pop();
            int a = stack.pop();
            stack.push(evaluate(a, b, token));
        }
    }
    
    return stack.pop();
}

private boolean isOperator(String token) {
    return token.equals("+") || token.equals("-") || 
           token.equals("*") || token.equals("/");
}

private int evaluate(int a, int b, String operator) {
    switch (operator) {
        case "+": return a + b;
        case "-": return a - b;
        case "*": return a * b;
        case "/": return a / b;
        default: return 0;
    }
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        explanation:
          "We use a stack to keep track of numbers. When we encounter an operator, we pop two numbers, perform the operation, and push the result back.",
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
        code: `public List<String> generateParenthesis(int n) {
    List<String> result = new ArrayList<>();
    generateAll("", 0, result, n * 2);
    return result;
}

private void generateAll(String current, int pos, List<String> result, int n) {
    if (pos == n) {
        if (isValid(current)) {
            result.add(current);
        }
        return;
    }
    
    generateAll(current + "(", pos + 1, result, n);
    generateAll(current + ")", pos + 1, result, n);
}

private boolean isValid(String s) {
    int balance = 0;
    for (char c : s.toCharArray()) {
        if (c == '(') balance++;
        else balance--;
        if (balance < 0) return false;
    }
    return balance == 0;
}`,
        timeComplexity: "O(2^(2n))",
        spaceComplexity: "O(n)",
        explanation:
          "We generate all possible combinations of parentheses and check each one for validity.",
      },
      {
        approach: "Optimal",
        code: `public List<String> generateParenthesis(int n) {
    List<String> result = new ArrayList<>();
    backtrack("", 0, 0, result, n);
    return result;
}

private void backtrack(String current, int open, int close, 
                      List<String> result, int max) {
    if (current.length() == max * 2) {
        result.add(current);
        return;
    }
    
    if (open < max) {
        backtrack(current + "(", open + 1, close, result, max);
    }
    if (close < open) {
        backtrack(current + ")", open, close + 1, result, max);
    }
}`,
        timeComplexity: "O(4^n/√n)",
        spaceComplexity: "O(n)",
        explanation:
          "We use backtracking to generate only valid combinations. We can add an opening parenthesis if we haven't used all n, and we can add a closing parenthesis if we have more open than closed ones.",
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
        explanation:
          "For temperatures[0] = 73, the next warmer temperature is temperatures[1] = 74, so answer[0] = 1.",
      },
      {
        input: "temperatures = [30,40,50,60]",
        output: "[1,1,1,0]",
      },
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public int[] dailyTemperatures(int[] temperatures) {
    int n = temperatures.length;
    int[] answer = new int[n];
    
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            if (temperatures[j] > temperatures[i]) {
                answer[i] = j - i;
                break;
            }
        }
    }
    
    return answer;
}`,
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        explanation:
          "For each day, we look at future days until we find a warmer temperature.",
      },
      {
        approach: "Optimal",
        code: `public int[] dailyTemperatures(int[] temperatures) {
    int n = temperatures.length;
    int[] answer = new int[n];
    Stack<Integer> stack = new Stack<>();
    
    for (int i = 0; i < n; i++) {
        while (!stack.isEmpty() && temperatures[i] > temperatures[stack.peek()]) {
            int prevDay = stack.pop();
            answer[prevDay] = i - prevDay;
        }
        stack.push(i);
    }
    
    return answer;
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        explanation:
          "We use a stack to keep track of indices of temperatures. When we find a warmer temperature, we update all previous cooler temperatures in the stack.",
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
      "There are n cars going to the same destination along a one-lane road. The destination is target miles away. You are given two integer array position and speed, both of length n, where position[i] is the position of the ith car and speed[i] is the speed of the ith car (in miles per hour). A car can never pass another car ahead of it, but it can catch up to it and drive bumper to bumper at the same speed. The faster car will slow down to match the slower car's speed. Return the number of car fleets that will arrive at the destination.",
    examples: [
      {
        input: "target = 12, position = [10,8,0,5,3], speed = [2,4,1,1,3]",
        output: "3",
        explanation:
          "The cars starting at 10 and 8 become a fleet, meeting at 12. The car starting at 0 doesn't catch up to any other car, so it is a fleet by itself. The cars starting at 5 and 3 become a fleet, meeting at 6. There are 3 fleets in total.",
      },
      {
        input: "target = 10, position = [3], speed = [3]",
        output: "1",
        explanation: "There is only one car, so there is only one fleet.",
      },
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public int carFleet(int target, int[] position, int[] speed) {
    int n = position.length;
    double[][] cars = new double[n][2];
    
    for (int i = 0; i < n; i++) {
        cars[i] = new double[] {position[i], (double)(target - position[i]) / speed[i]};
    }
    
    Arrays.sort(cars, (a, b) -> Double.compare(a[0], b[0]));
    
    int fleets = 0;
    for (int i = 0; i < n; i++) {
        double time = cars[i][1];
        while (i < n - 1 && time >= cars[i + 1][1]) {
            i++;
        }
        fleets++;
    }
    
    return fleets;
}`,
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(n)",
        explanation:
          "We calculate arrival time for each car and sort by position. Then we count the number of fleets by checking which cars will catch up to others.",
      },
      {
        approach: "Optimal",
        code: `public int carFleet(int target, int[] position, int[] speed) {
    int n = position.length;
    double[][] cars = new double[n][2];
    
    for (int i = 0; i < n; i++) {
        cars[i] = new double[] {position[i], (double)(target - position[i]) / speed[i]};
    }
    
    Arrays.sort(cars, (a, b) -> Double.compare(b[0], a[0]));
    
    int fleets = 0;
    double slowest = 0;
    
    for (double[] car : cars) {
        if (car[1] > slowest) {
            slowest = car[1];
            fleets++;
        }
    }
    
    return fleets;
}`,
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(n)",
        explanation:
          "We sort cars by position in descending order. If a car takes longer to reach the target than any car ahead of it, it becomes a new fleet.",
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
        explanation: "The largest rectangle has area = 5 * 2 = 10 units.",
      },
      {
        input: "heights = [2,4]",
        output: "4",
      },
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public int largestRectangleArea(int[] heights) {
    int maxArea = 0;
    int n = heights.length;
    
    for (int i = 0; i < n; i++) {
        int minHeight = heights[i];
        for (int j = i; j < n; j++) {
            minHeight = Math.min(minHeight, heights[j]);
            maxArea = Math.max(maxArea, minHeight * (j - i + 1));
        }
    }
    
    return maxArea;
}`,
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        explanation:
          "For each position, we try to extend the rectangle to the right while keeping track of the minimum height.",
      },
      {
        approach: "Optimal",
        code: `public int largestRectangleArea(int[] heights) {
    int n = heights.length;
    Stack<Integer> stack = new Stack<>();
    int maxArea = 0;
    
    for (int i = 0; i <= n; i++) {
        int h = (i == n ? 0 : heights[i]);
        
        while (!stack.isEmpty() && h < heights[stack.peek()]) {
            int height = heights[stack.pop()];
            int width = stack.isEmpty() ? i : i - stack.peek() - 1;
            maxArea = Math.max(maxArea, height * width);
        }
        
        stack.push(i);
    }
    
    return maxArea;
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        explanation:
          "We use a stack to keep track of indices. When we find a smaller height, we calculate the area of rectangles that end at the current position.",
      },
    ],
    leetCodeUrl:
      "https://leetcode.com/problems/largest-rectangle-in-histogram/",
    difficulty: "Hard",
    category: "stack",
  },
];
