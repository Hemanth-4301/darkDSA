import { Question } from "";

export const linkedListQuestions: Question[] = [
  {
    id: "reverse-linked-list",
    title: "Reverse Linked List",
    description:
      "Given the head of a singly linked list, reverse the list, and return the reversed list.",
    difficulty: "Easy",
    tags: ["Linked List", "Recursion"],
    examples: [
      {
        input: "head = [1,2,3,4,5]",
        output: "[5,4,3,2,1]",
      },
      {
        input: "head = [1,2]",
        output: "[2,1]",
      },
    ],
    bruteForceSolution: `class Solution {
    public ListNode reverseList(ListNode head) {
        // Store all values in array, then rebuild list
        List<Integer> values = new ArrayList<>();
        ListNode current = head;
        
        while (current != null) {
            values.add(current.val);
            current = current.next;
        }
        
        // Build new list in reverse order
        ListNode dummy = new ListNode(0);
        current = dummy;
        
        for (int i = values.size() - 1; i >= 0; i--) {
            current.next = new ListNode(values.get(i));
            current = current.next;
        }
        
        return dummy.next;
    }
}`,
    optimalSolution: `class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode current = head;
        
        while (current != null) {
            ListNode nextTemp = current.next;
            current.next = prev;
            prev = current;
            current = nextTemp;
        }
        
        return prev;
    }
}`,
    bruteForceComplexity: {
      time: "O(n)",
      space: "O(n)",
      reasoning:
        "Store all values in array then rebuild list, requiring extra space.",
    },
    optimalComplexity: {
      time: "O(n)",
      space: "O(1)",
      reasoning:
        "Iterative approach reversing pointers in place with constant extra space.",
    },
    leetcodeUrl: "https://leetcode.com/problems/reverse-linked-list/",
  },
  {
    id: "merge-two-sorted-lists",
    title: "Merge Two Sorted Lists",
    description:
      "You are given the heads of two sorted linked lists list1 and list2.\n\nMerge the two lists in a one sorted list. The list should be made by splicing together the nodes of the first two lists.\n\nReturn the head of the merged linked list.",
    difficulty: "Easy",
    tags: ["Linked List", "Recursion"],
    examples: [
      {
        input: "list1 = [1,2,4], list2 = [1,3,4]",
        output: "[1,1,2,3,4,4]",
      },
      {
        input: "list1 = [], list2 = []",
        output: "[]",
      },
    ],
    bruteForceSolution: `class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        // Collect all values and sort them
        List<Integer> values = new ArrayList<>();
        
        ListNode current = list1;
        while (current != null) {
            values.add(current.val);
            current = current.next;
        }
        
        current = list2;
        while (current != null) {
            values.add(current.val);
            current = current.next;
        }
        
        Collections.sort(values);
        
        // Build new sorted list
        ListNode dummy = new ListNode(0);
        current = dummy;
        
        for (int val : values) {
            current.next = new ListNode(val);
            current = current.next;
        }
        
        return dummy.next;
    }
}`,
    optimalSolution: `class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        ListNode dummy = new ListNode(0);
        ListNode current = dummy;
        
        while (list1 != null && list2 != null) {
            if (list1.val <= list2.val) {
                current.next = list1;
                list1 = list1.next;
            } else {
                current.next = list2;
                list2 = list2.next;
            }
            current = current.next;
        }
        
        // Attach remaining nodes
        current.next = (list1 != null) ? list1 : list2;
        
        return dummy.next;
    }
}`,
    bruteForceComplexity: {
      time: "O((m + n) log(m + n))",
      space: "O(m + n)",
      reasoning: "Collect all values, sort them, then rebuild list.",
    },
    optimalComplexity: {
      time: "O(m + n)",
      space: "O(1)",
      reasoning:
        "Single pass through both lists using two pointers to merge in sorted order.",
    },
    leetcodeUrl: "https://leetcode.com/problems/merge-two-sorted-lists/",
  },
  {
    id: "reorder-list",
    title: "Reorder List",
    description:
      "You are given the head of a singly linked-list. The list can be represented as:\n\nL0 → L1 → … → Ln - 1 → Ln\n\nReorder the list to be on the following form:\n\nL0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …\n\nYou may not modify the values in the list's nodes. Only nodes themselves may be changed.",
    difficulty: "Medium",
    tags: ["Linked List", "Two Pointers", "Stack", "Recursion"],
    examples: [
      {
        input: "head = [1,2,3,4]",
        output: "[1,4,2,3]",
      },
      {
        input: "head = [1,2,3,4,5]",
        output: "[1,5,2,4,3]",
      },
    ],
    bruteForceSolution: `class Solution {
    public void reorderList(ListNode head) {
        if (head == null || head.next == null) return;
        
        // Store all nodes in array
        List<ListNode> nodes = new ArrayList<>();
        ListNode current = head;
        
        while (current != null) {
            nodes.add(current);
            current = current.next;
        }
        
        // Reorder using two pointers on array
        int left = 0, right = nodes.size() - 1;
        
        while (left < right) {
            nodes.get(left).next = nodes.get(right);
            left++;
            
            if (left >= right) break;
            
            nodes.get(right).next = nodes.get(left);
            right--;
        }
        
        nodes.get(left).next = null;
    }
}`,
    optimalSolution: `class Solution {
    public void reorderList(ListNode head) {
        if (head == null || head.next == null) return;
        
        // Find middle of list
        ListNode slow = head, fast = head;
        while (fast.next != null && fast.next.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        
        // Reverse second half
        ListNode second = reverseList(slow.next);
        slow.next = null;
        
        // Merge two halves
        ListNode first = head;
        while (second != null) {
            ListNode temp1 = first.next;
            ListNode temp2 = second.next;
            
            first.next = second;
            second.next = temp1;
            
            first = temp1;
            second = temp2;
        }
    }
    
    private ListNode reverseList(ListNode head) {
        ListNode prev = null;
        while (head != null) {
            ListNode next = head.next;
            head.next = prev;
            prev = head;
            head = next;
        }
        return prev;
    }
}`,
    bruteForceComplexity: {
      time: "O(n)",
      space: "O(n)",
      reasoning: "Store all nodes in array, then reorder using two pointers.",
    },
    optimalComplexity: {
      time: "O(n)",
      space: "O(1)",
      reasoning:
        "Find middle, reverse second half, then merge two halves in place.",
    },
    leetcodeUrl: "https://leetcode.com/problems/reorder-list/",
  },
  {
    id: "remove-nth-node-from-end-of-list",
    title: "Remove Nth Node From End of List",
    description:
      "Given the head of a linked list, remove the nth node from the end of the list and return its head.",
    difficulty: "Medium",
    tags: ["Linked List", "Two Pointers"],
    examples: [
      {
        input: "head = [1,2,3,4,5], n = 2",
        output: "[1,2,3,5]",
      },
      {
        input: "head = [1], n = 1",
        output: "[]",
      },
    ],
    bruteForceSolution: `class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        // First pass: count total nodes
        int length = 0;
        ListNode current = head;
        while (current != null) {
            length++;
            current = current.next;
        }
        
        // Calculate position from start
        int positionFromStart = length - n;
        
        // Handle edge case: removing head
        if (positionFromStart == 0) {
            return head.next;
        }
        
        // Second pass: find node before target
        current = head;
        for (int i = 0; i < positionFromStart - 1; i++) {
            current = current.next;
        }
        
        // Remove target node
        current.next = current.next.next;
        
        return head;
    }
}`,
    optimalSolution: `class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        
        ListNode first = dummy;
        ListNode second = dummy;
        
        // Move first pointer n+1 steps ahead
        for (int i = 0; i <= n; i++) {
            first = first.next;
        }
        
        // Move both pointers until first reaches end
        while (first != null) {
            first = first.next;
            second = second.next;
        }
        
        // Remove nth node from end
        second.next = second.next.next;
        
        return dummy.next;
    }
}`,
    bruteForceComplexity: {
      time: "O(n)",
      space: "O(1)",
      reasoning:
        "Two passes: first to count length, second to find and remove node.",
    },
    optimalComplexity: {
      time: "O(n)",
      space: "O(1)",
      reasoning: "Single pass using two pointers with n+1 gap between them.",
    },
    leetcodeUrl:
      "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",
  },
  {
    id: "copy-list-with-random-pointer",
    title: "Copy List with Random Pointer",
    description:
      "A linked list of length n is given such that each node contains an additional random pointer, which could point to any node in the list, or null.\n\nConstruct a deep copy of the list. The deep copy should consist of exactly n brand new nodes, where each new node has its value set to the value of its corresponding original node. Both the next and random pointers of the new nodes should point to new nodes in the copied list such that the pointers in the original list and copied list represent the same list state. None of the pointers in the new list should point to nodes in the original list.\n\nFor example, if there are two nodes X and Y in the original list, where X.random --> Y, then for the corresponding two nodes x and y in the copied list, x.random --> y.\n\nReturn the head of the copied linked list.",
    difficulty: "Medium",
    tags: ["Hash Table", "Linked List"],
    examples: [
      {
        input: "head = [[7,null],[13,0],[11,4],[10,2],[1,0]]",
        output: "[[7,null],[13,0],[11,4],[10,2],[1,0]]",
      },
      {
        input: "head = [[1,1],[2,1]]",
        output: "[[1,1],[2,1]]",
      },
    ],
    bruteForceSolution: `class Solution {
    public Node copyRandomList(Node head) {
        if (head == null) return null;
        
        // First pass: create nodes with next pointers
        Map<Node, Node> oldToNew = new HashMap<>();
        Node current = head;
        
        while (current != null) {
            oldToNew.put(current, new Node(current.val));
            current = current.next;
        }
        
        // Second pass: set next pointers
        current = head;
        while (current != null) {
            if (current.next != null) {
                oldToNew.get(current).next = oldToNew.get(current.next);
            }
            current = current.next;
        }
        
        // Third pass: set random pointers
        current = head;
        while (current != null) {
            if (current.random != null) {
                oldToNew.get(current).random = oldToNew.get(current.random);
            }
            current = current.next;
        }
        
        return oldToNew.get(head);
    }
}`,
    optimalSolution: `class Solution {
    public Node copyRandomList(Node head) {
        if (head == null) return null;
        
        Map<Node, Node> oldToNew = new HashMap<>();
        
        Node current = head;
        while (current != null) {
            oldToNew.put(current, new Node(current.val));
            current = current.next;
        }
        
        current = head;
        while (current != null) {
            Node newNode = oldToNew.get(current);
            newNode.next = oldToNew.get(current.next);
            newNode.random = oldToNew.get(current.random);
            current = current.next;
        }
        
        return oldToNew.get(head);
    }
}`,
    bruteForceComplexity: {
      time: "O(n)",
      space: "O(n)",
      reasoning:
        "Three passes through list: create nodes, set next pointers, set random pointers.",
    },
    optimalComplexity: {
      time: "O(n)",
      space: "O(n)",
      reasoning:
        "Two passes: create all new nodes in HashMap, then set both next and random pointers.",
    },
    leetcodeUrl: "https://leetcode.com/problems/copy-list-with-random-pointer/",
  },
  {
    id: "add-two-numbers",
    title: "Add Two Numbers",
    description:
      "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.\n\nYou may assume the two numbers do not contain any leading zero, except the number 0 itself.",
    difficulty: "Medium",
    tags: ["Linked List", "Math", "Recursion"],
    examples: [
      {
        input: "l1 = [2,4,3], l2 = [5,6,4]",
        output: "[7,0,8]",
        explanation: "342 + 465 = 807.",
      },
      {
        input: "l1 = [0], l2 = [0]",
        output: "[0]",
      },
    ],
    bruteForceSolution: `class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        // Convert linked lists to numbers
        long num1 = 0, num2 = 0;
        long multiplier = 1;
        
        while (l1 != null) {
            num1 += l1.val * multiplier;
            multiplier *= 10;
            l1 = l1.next;
        }
        
        multiplier = 1;
        while (l2 != null) {
            num2 += l2.val * multiplier;
            multiplier *= 10;
            l2 = l2.next;
        }
        
        long sum = num1 + num2;
        
        // Convert sum back to linked list
        if (sum == 0) return new ListNode(0);
        
        ListNode dummy = new ListNode(0);
        ListNode current = dummy;
        
        while (sum > 0) {
            current.next = new ListNode((int)(sum % 10));
            sum /= 10;
            current = current.next;
        }
        
        return dummy.next;
    }
}`,
    optimalSolution: `class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode(0);
        ListNode current = dummy;
        int carry = 0;
        
        while (l1 != null || l2 != null || carry != 0) {
            int val1 = (l1 != null) ? l1.val : 0;
            int val2 = (l2 != null) ? l2.val : 0;
            
            int sum = val1 + val2 + carry;
            carry = sum / 10;
            
            current.next = new ListNode(sum % 10);
            current = current.next;
            
            if (l1 != null) l1 = l1.next;
            if (l2 != null) l2 = l2.next;
        }
        
        return dummy.next;
    }
}`,
    bruteForceComplexity: {
      time: "O(max(m, n))",
      space: "O(max(m, n))",
      reasoning:
        "Convert to numbers (risk of overflow), add, then convert back to linked list.",
    },
    optimalComplexity: {
      time: "O(max(m, n))",
      space: "O(max(m, n))",
      reasoning:
        "Single pass with carry propagation, handles arbitrary length numbers safely.",
    },
    leetcodeUrl: "https://leetcode.com/problems/add-two-numbers/",
  },
  {
    id: "linked-list-cycle",
    title: "Linked List Cycle",
    description:
      "Given head, the head of a linked list, determine if the linked list has a cycle in it.\n\nThere is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to. Note that pos is not passed as a parameter.\n\nReturn true if there is a cycle in the linked list. Otherwise, return false.",
    difficulty: "Easy",
    tags: ["Hash Table", "Linked List", "Two Pointers"],
    examples: [
      {
        input: "head = [3,2,0,-4], pos = 1",
        output: "true",
        explanation:
          "There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).",
      },
      {
        input: "head = [1], pos = -1",
        output: "false",
        explanation: "There is no cycle in the linked list.",
      },
    ],
    bruteForceSolution: `class Solution {
    public boolean hasCycle(ListNode head) {
        Set<ListNode> visited = new HashSet<>();
        
        ListNode current = head;
        while (current != null) {
            if (visited.contains(current)) {
                return true;
            }
            visited.add(current);
            current = current.next;
        }
        
        return false;
    }
}`,
    optimalSolution: `class Solution {
    public boolean hasCycle(ListNode head) {
        if (head == null || head.next == null) return false;
        
        ListNode slow = head;
        ListNode fast = head.next;
        
        while (fast != null && fast.next != null) {
            if (slow == fast) {
                return true;
            }
            slow = slow.next;
            fast = fast.next.next;
        }
        
        return false;
    }
}`,
    bruteForceComplexity: {
      time: "O(n)",
      space: "O(n)",
      reasoning: "Use HashSet to track visited nodes, requires extra space.",
    },
    optimalComplexity: {
      time: "O(n)",
      space: "O(1)",
      reasoning:
        "Floyd's cycle detection with slow and fast pointers, constant space.",
    },
    leetcodeUrl: "https://leetcode.com/problems/linked-list-cycle/",
  },
  {
    id: "find-the-duplicate-number",
    title: "Find the Duplicate Number",
    description:
      "Given an array of integers nums containing n + 1 integers where each integer is in the range [1, n] inclusive.\n\nThere is only one repeated number in nums, return this repeated number.\n\nYou must solve the problem without modifying the array nums and uses only constant extra space.",
    difficulty: "Medium",
    tags: ["Array", "Two Pointers", "Binary Search", "Bit Manipulation"],
    examples: [
      {
        input: "nums = [1,3,4,2,2]",
        output: "2",
      },
      {
        input: "nums = [3,1,3,4,2]",
        output: "3",
      },
    ],
    bruteForceSolution: `class Solution {
    public int findDuplicate(int[] nums) {
        // Try each number and count occurrences
        for (int i = 1; i < nums.length; i++) {
            int count = 0;
            for (int num : nums) {
                if (num == i) {
                    count++;
                }
            }
            if (count > 1) {
                return i;
            }
        }
        return -1;
    }
}`,
    optimalSolution: `class Solution {
    public int findDuplicate(int[] nums) {
        // Floyd's cycle detection algorithm
        int slow = nums[0];
        int fast = nums[0];
        
        // Phase 1: Find intersection point in cycle
        do {
            slow = nums[slow];
            fast = nums[nums[fast]];
        } while (slow != fast);
        
        // Phase 2: Find entrance to cycle
        slow = nums[0];
        while (slow != fast) {
            slow = nums[slow];
            fast = nums[fast];
        }
        
        return slow;
    }
}`,
    bruteForceComplexity: {
      time: "O(n²)",
      space: "O(1)",
      reasoning: "For each possible duplicate, count its occurrences in array.",
    },
    optimalComplexity: {
      time: "O(n)",
      space: "O(1)",
      reasoning:
        "Treat array as linked list, use Floyd's algorithm to detect cycle.",
    },
    leetcodeUrl: "https://leetcode.com/problems/find-the-duplicate-number/",
  },
  {
    id: "lru-cache",
    title: "LRU Cache",
    description:
      "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.\n\nImplement the LRUCache class:\n\n- LRUCache(int capacity) Initialize the LRU cache with positive size capacity.\n- int get(int key) Return the value of the key if the key exists, otherwise return -1.\n- void put(int key, int value) Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity from this operation, evict the least recently used key.\n\nThe functions get and put must each run in O(1) average time complexity.",
    difficulty: "Medium",
    tags: ["Hash Table", "Linked List", "Design", "Doubly-Linked List"],
    examples: [
      {
        input:
          '["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]\n[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]',
        output: "[null, null, null, 1, null, -1, null, -1, 3, 4]",
        explanation:
          "LRUCache lRUCache = new LRUCache(2);\nlRUCache.put(1, 1); // cache is {1=1}\nlRUCache.put(2, 2); // cache is {1=1, 2=2}\nlRUCache.get(1);    // return 1\nlRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}\nlRUCache.get(2);    // returns -1 (not found)\nlRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3}\nlRUCache.get(1);    // return -1 (not found)\nlRUCache.get(3);    // return 3\nlRUCache.get(4);    // return 4",
      },
    ],
    bruteForceSolution: `class LRUCache {
    private int capacity;
    private List<int[]> cache; // [key, value, timestamp]
    private int time;
    
    public LRUCache(int capacity) {
        this.capacity = capacity;
        this.cache = new ArrayList<>();
        this.time = 0;
    }
    
    public int get(int key) {
        for (int[] entry : cache) {
            if (entry[0] == key) {
                entry[2] = ++time; // Update timestamp
                return entry[1];
            }
        }
        return -1;
    }
    
    public void put(int key, int value) {
        // Check if key exists
        for (int[] entry : cache) {
            if (entry[0] == key) {
                entry[1] = value;
                entry[2] = ++time;
                return;
            }
        }
        
        // Add new entry
        if (cache.size() >= capacity) {
            // Remove LRU entry
            int minTime = Integer.MAX_VALUE;
            int lruIndex = 0;
            for (int i = 0; i < cache.size(); i++) {
                if (cache.get(i)[2] < minTime) {
                    minTime = cache.get(i)[2];
                    lruIndex = i;
                }
            }
            cache.remove(lruIndex);
        }
        
        cache.add(new int[]{key, value, ++time});
    }
}`,
    optimalSolution: `class LRUCache {
    class Node {
        int key, value;
        Node prev, next;
        Node(int key, int value) {
            this.key = key;
            this.value = value;
        }
    }
    
    private int capacity;
    private Map<Integer, Node> map;
    private Node head, tail;
    
    public LRUCache(int capacity) {
        this.capacity = capacity;
        this.map = new HashMap<>();
        
        // Create dummy head and tail
        head = new Node(0, 0);
        tail = new Node(0, 0);
        head.next = tail;
        tail.prev = head;
    }
    
    public int get(int key) {
        Node node = map.get(key);
        if (node == null) return -1;
        
        // Move to head (most recently used)
        moveToHead(node);
        return node.value;
    }
    
    public void put(int key, int value) {
        Node node = map.get(key);
        
        if (node != null) {
            // Update existing node
            node.value = value;
            moveToHead(node);
        } else {
            // Add new node
            node = new Node(key, value);
            
            if (map.size() >= capacity) {
                // Remove LRU node
                Node lru = tail.prev;
                removeNode(lru);
                map.remove(lru.key);
            }
            
            addToHead(node);
            map.put(key, node);
        }
    }
    
    private void removeNode(Node node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }
    
    private void addToHead(Node node) {
        node.prev = head;
        node.next = head.next;
        head.next.prev = node;
        head.next = node;
    }
    
    private void moveToHead(Node node) {
        removeNode(node);
        addToHead(node);
    }
}`,
    bruteForceComplexity: {
      time: "O(n) for both get and put",
      space: "O(capacity)",
      reasoning: "Linear search through list to find keys and LRU entries.",
    },
    optimalComplexity: {
      time: "O(1) for both get and put",
      space: "O(capacity)",
      reasoning:
        "HashMap for O(1) lookup, doubly-linked list for O(1) insertion/deletion.",
    },
    leetcodeUrl: "https://leetcode.com/problems/lru-cache/",
  },
  {
    id: "merge-k-sorted-lists",
    title: "Merge k Sorted Lists",
    description:
      "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.\n\nMerge all the linked-lists into one sorted linked-list and return it.",
    difficulty: "Hard",
    tags: [
      "Linked List",
      "Divide and Conquer",
      "Heap (Priority Queue)",
      "Merge Sort",
    ],
    examples: [
      {
        input: "lists = [[1,4,5],[1,3,4],[2,6]]",
        output: "[1,1,2,3,4,4,5,6]",
        explanation:
          "The linked-lists are:\n[\n  1->4->5,\n  1->3->4,\n  2->6\n]\nmerging them into one sorted list:\n1->1->2->3->4->4->5->6",
      },
      {
        input: "lists = []",
        output: "[]",
      },
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
        
        while (lists.length > 1) {
            List<ListNode> mergedLists = new ArrayList<>();
            
            for (int i = 0; i < lists.length; i += 2) {
                ListNode l1 = lists[i];
                ListNode l2 = (i + 1 < lists.length) ? lists[i + 1] : null;
                mergedLists.add(mergeTwoLists(l1, l2));
            }
            
            lists = mergedLists.toArray(new ListNode[0]);
        }
        
        return lists[0];
    }
    
    private ListNode mergeTwoLists(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode(0);
        ListNode current = dummy;
        
        while (l1 != null && l2 != null) {
            if (l1.val <= l2.val) {
                current.next = l1;
                l1 = l1.next;
            } else {
                current.next = l2;
                l2 = l2.next;
            }
            current = current.next;
        }
        
        current.next = (l1 != null) ? l1 : l2;
        return dummy.next;
    }
}`,
    bruteForceComplexity: {
      time: "O(N log N)",
      space: "O(N)",
      reasoning: "Collect all N values, sort them, then rebuild list.",
    },
    optimalComplexity: {
      time: "O(N log k)",
      space: "O(1)",
      reasoning:
        "Divide and conquer: repeatedly merge pairs of lists, log k levels of merging.",
    },
    leetcodeUrl: "https://leetcode.com/problems/merge-k-sorted-lists/",
  },
];
