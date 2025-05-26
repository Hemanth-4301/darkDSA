import { Question } from '../types';

export const linkedListQuestions: Question[] = [
  {
    id: 38,
    title: "Reverse Linked List",
    description: "Given the head of a singly linked list, reverse the list, and return the reversed list.",
    examples: [
      {
        input: "head = [1,2,3,4,5]",
        output: "[5,4,3,2,1]"
      },
      {
        input: "head = [1,2]",
        output: "[2,1]"
      }
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public ListNode reverseList(ListNode head) {
    ArrayList<Integer> values = new ArrayList<>();
    ListNode current = head;
    
    while (current != null) {
        values.add(current.val);
        current = current.next;
    }
    
    current = head;
    for (int i = values.size() - 1; i >= 0; i--) {
        current.val = values.get(i);
        current = current.next;
    }
    
    return head;
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        explanation: "We store all values in an array, then traverse the list again to update values in reverse order."
      },
      {
        approach: "Optimal",
        code: `public ListNode reverseList(ListNode head) {
    ListNode prev = null;
    ListNode current = head;
    
    while (current != null) {
        ListNode nextTemp = current.next;
        current.next = prev;
        prev = current;
        current = nextTemp;
    }
    
    return prev;
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        explanation: "We use three pointers to reverse the links between nodes as we traverse the list."
      }
    ],
    leetCodeUrl: "https://leetcode.com/problems/reverse-linked-list/",
    difficulty: "Easy",
    category: "linkedList"
  },
  {
    id: 39,
    title: "Merge Two Sorted Lists",
    description: "You are given the heads of two sorted linked lists list1 and list2. Merge the two lists in a one sorted list. The list should be made by splicing together the nodes of the first two lists. Return the head of the merged linked list.",
    examples: [
      {
        input: "list1 = [1,2,4], list2 = [1,3,4]",
        output: "[1,1,2,3,4,4]"
      },
      {
        input: "list1 = [], list2 = []",
        output: "[]"
      }
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
    ArrayList<Integer> values = new ArrayList<>();
    
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
    
    ListNode dummy = new ListNode(0);
    current = dummy;
    for (int val : values) {
        current.next = new ListNode(val);
        current = current.next;
    }
    
    return dummy.next;
}`,
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(n)",
        explanation: "We collect all values in an array, sort them, and create a new linked list."
      },
      {
        approach: "Optimal",
        code: `public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
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
    
    current.next = list1 != null ? list1 : list2;
    
    return dummy.next;
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        explanation: "We maintain a pointer to the current node and compare values from both lists, choosing the smaller one each time."
      }
    ],
    leetCodeUrl: "https://leetcode.com/problems/merge-two-sorted-lists/",
    difficulty: "Easy",
    category: "linkedList"
  },
  {
    id: 40,
    title: "Reorder List",
    description: "You are given the head of a singly linked-list. The list can be represented as: L0 → L1 → … → Ln - 1 → Ln. Reorder the list to be: L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …",
    examples: [
      {
        input: "head = [1,2,3,4]",
        output: "[1,4,2,3]"
      },
      {
        input: "head = [1,2,3,4,5]",
        output: "[1,5,2,4,3]"
      }
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public void reorderList(ListNode head) {
    if (head == null || head.next == null) return;
    
    ArrayList<ListNode> nodes = new ArrayList<>();
    ListNode current = head;
    while (current != null) {
        nodes.add(current);
        current = current.next;
    }
    
    int i = 0;
    int j = nodes.size() - 1;
    while (i < j) {
        nodes.get(i).next = nodes.get(j);
        i++;
        if (i == j) break;
        nodes.get(j).next = nodes.get(i);
        j--;
    }
    nodes.get(i).next = null;
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        explanation: "We store all nodes in an array and then reorder them using two pointers."
      },
      {
        approach: "Optimal",
        code: `public void reorderList(ListNode head) {
    if (head == null || head.next == null) return;
    
    // Find middle
    ListNode slow = head;
    ListNode fast = head;
    while (fast.next != null && fast.next.next != null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    
    // Reverse second half
    ListNode prev = null;
    ListNode curr = slow.next;
    slow.next = null;
    while (curr != null) {
        ListNode nextTemp = curr.next;
        curr.next = prev;
        prev = curr;
        curr = nextTemp;
    }
    
    // Merge lists
    ListNode first = head;
    ListNode second = prev;
    while (second != null) {
        ListNode temp1 = first.next;
        ListNode temp2 = second.next;
        first.next = second;
        second.next = temp1;
        first = temp1;
        second = temp2;
    }
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        explanation: "We find the middle of the list using slow and fast pointers, reverse the second half, and then merge the two halves."
      }
    ],
    leetCodeUrl: "https://leetcode.com/problems/reorder-list/",
    difficulty: "Medium",
    category: "linkedList"
  },
  {
    id: 41,
    title: "Remove Nth Node From End of List",
    description: "Given the head of a linked list, remove the nth node from the end of the list and return its head.",
    examples: [
      {
        input: "head = [1,2,3,4,5], n = 2",
        output: "[1,2,3,5]"
      },
      {
        input: "head = [1], n = 1",
        output: "[]"
      }
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public ListNode removeNthFromEnd(ListNode head, int n) {
    // Find length
    int length = 0;
    ListNode current = head;
    while (current != null) {
        length++;
        current = current.next;
    }
    
    if (length == n) return head.next;
    
    current = head;
    for (int i = 0; i < length - n - 1; i++) {
        current = current.next;
    }
    
    current.next = current.next.next;
    return head;
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        explanation: "We first count the length of the list, then remove the node at position (length - n)."
      },
      {
        approach: "Optimal",
        code: `public ListNode removeNthFromEnd(ListNode head, int n) {
    ListNode dummy = new ListNode(0);
    dummy.next = head;
    ListNode first = dummy;
    ListNode second = dummy;
    
    // Advance first pointer by n + 1 steps
    for (int i = 0; i <= n; i++) {
        first = first.next;
    }
    
    // Move both pointers until first reaches end
    while (first != null) {
        first = first.next;
        second = second.next;
    }
    
    second.next = second.next.next;
    return dummy.next;
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        explanation: "We use two pointers with a gap of n nodes between them. When the first pointer reaches the end, the second pointer is at the node before the one we want to remove."
      }
    ],
    leetCodeUrl: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",
    difficulty: "Medium",
    category: "linkedList"
  },
  {
    id: 42,
    title: "Copy List with Random Pointer",
    description: "A linked list of length n is given such that each node contains an additional random pointer, which could point to any node in the list, or null. Construct a deep copy of the list.",
    examples: [
      {
        input: "head = [[7,null],[13,0],[11,4],[10,2],[1,0]]",
        output: "[[7,null],[13,0],[11,4],[10,2],[1,0]]"
      },
      {
        input: "head = [[1,1],[2,1]]",
        output: "[[1,1],[2,1]]"
      }
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public Node copyRandomList(Node head) {
    if (head == null) return null;
    
    Map<Node, Node> map = new HashMap<>();
    
    // First pass: create new nodes
    Node current = head;
    while (current != null) {
        map.put(current, new Node(current.val));
        current = current.next;
    }
    
    // Second pass: assign next and random pointers
    current = head;
    while (current != null) {
        map.get(current).next = map.get(current.next);
        map.get(current).random = map.get(current.random);
        current = current.next;
    }
    
    return map.get(head);
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        explanation: "We use a hash map to store the mapping between original nodes and their copies. Then we set the pointers in two passes."
      },
      {
        approach: "Optimal",
        code: `public Node copyRandomList(Node head) {
    if (head == null) return null;
    
    // First pass: create new nodes
    Node current = head;
    while (current != null) {
        Node copy = new Node(current.val);
        copy.next = current.next;
        current.next = copy;
        current = copy.next;
    }
    
    // Second pass: assign random pointers
    current = head;
    while (current != null) {
        if (current.random != null) {
            current.next.random = current.random.next;
        }
        current = current.next.next;
    }
    
    // Third pass: restore original list and extract copy
    current = head;
    Node dummy = new Node(0);
    Node copyTail = dummy;
    
    while (current != null) {
        Node next = current.next.next;
        Node copy = current.next;
        
        copyTail.next = copy;
        copyTail = copy;
        
        current.next = next;
        current = next;
    }
    
    return dummy.next;
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        explanation: "We interweave the copied list with the original list, then use the interweaved structure to set random pointers, and finally separate the two lists."
      }
    ],
    leetCodeUrl: "https://leetcode.com/problems/copy-list-with-random-pointer/",
    difficulty: "Medium",
    category: "linkedList"
  },
  {
    id: 43,
    title: "Add Two Numbers",
    description: "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.",
    examples: [
      {
        input: "l1 = [2,4,3], l2 = [5,6,4]",
        output: "[7,0,8]",
        explanation: "342 + 465 = 807."
      },
      {
        input: "l1 = [0], l2 = [0]",
        output: "[0]"
      }
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
    long num1 = 0, num2 = 0;
    int power = 0;
    
    ListNode current = l1;
    while (current != null) {
        num1 += current.val * Math.pow(10, power++);
        current = current.next;
    }
    
    power = 0;
    current = l2;
    while (current != null) {
        num2 += current.val * Math.pow(10, power++);
        current = current.next;
    }
    
    long sum = num1 + num2;
    
    ListNode dummy = new ListNode(0);
    current = dummy;
    
    if (sum == 0) return new ListNode(0);
    
    while (sum > 0) {
        current.next = new ListNode((int)(sum % 10));
        sum /= 10;
        current = current.next;
    }
    
    return dummy.next;
}`,
        timeComplexity: "O(max(n,m))",
        spaceComplexity: "O(max(n,m))",
        explanation: "We convert the linked lists to numbers, add them, and create a new linked list from the sum."
      },
      {
        approach: "Optimal",
        code: `public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
    ListNode dummy = new ListNode(0);
    ListNode current = dummy;
    int carry = 0;
    
    while (l1 != null || l2 != null || carry != 0) {
        int x = (l1 != null) ? l1.val : 0;
        int y = (l2 != null) ? l2.val : 0;
        int sum = x + y + carry;
        
        carry = sum / 10;
        current.next = new ListNode(sum % 10);
        current = current.next;
        
        if (l1 != null) l1 = l1.next;
        if (l2 != null) l2 = l2.next;
    }
    
    return dummy.next;
}`,
        timeComplexity: "O(max(n,m))",
        spaceComplexity: "O(max(n,m))",
        explanation: "We traverse both lists simultaneously, adding digits and keeping track of the carry."
      }
    ],
    leetCodeUrl: "https://leetcode.com/problems/add-two-numbers/",
    difficulty: "Medium",
    category: "linkedList"
  },
  {
    id: 44,
    title: "Linked List Cycle",
    description: "Given head, the head of a linked list, determine if the linked list has a cycle in it. There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer.",
    examples: [
      {
        input: "head = [3,2,0,-4], pos = 1",
        output: "true",
        explanation: "There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed)."
      },
      {
        input: "head = [1,2], pos = 0",
        output: "true",
        explanation: "There is a cycle in the linked list, where the tail connects to the 0th node."
      }
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public boolean hasCycle(ListNode head) {
    Set<ListNode> seen = new HashSet<>();
    ListNode current = head;
    
    while (current != null) {
        if (seen.contains(current)) {
            return true;
        }
        seen.add(current);
        current = current.next;
    }
    
    return false;
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        explanation: "We use a hash set to keep track of nodes we've seen. If we encounter a node we've seen before, there's a cycle."
      },
      {
        approach: "Optimal",
        code: `public boolean hasCycle(ListNode head) {
    if (head == null || head.next == null) {
        return false;
    }
    
    ListNode slow = head;
    ListNode fast = head;
    
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
        
        if (slow == fast) {
            return true;
        }
    }
    
    return false;
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        explanation: "We use Floyd's Cycle-Finding Algorithm (tortoise and hare). If there's a cycle, the fast pointer will eventually catch up to the slow pointer."
      }
    ],
    leetCodeUrl: "https://leetcode.com/problems/linked-list-cycle/",
    difficulty: "Easy",
    category: "linkedList"
  },
  {
    id: 45,
    title: "Find the Duplicate Number",
    description: "Given an array of integers nums containing n + 1 integers where each integer is in the range [1, n] inclusive. There is only one repeated number in nums, return this repeated number. You must solve the problem without modifying the array nums and uses only constant extra space.",
    examples: [
      {
        input: "nums = [1,3,4,2,2]",
        output: "2"
      },
      {
        input: "nums = [3,1,3,4,2]",
        output: "3"
      }
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public int findDuplicate(int[] nums) {
    Arrays.sort(nums);
    for (int i = 1; i < nums.length; i++) {
        if (nums[i] == nums[i-1]) {
            return nums[i];
        }
    }
    return -1;
}`,
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(1)",
        explanation: "We sort the array and look for adjacent equal numbers."
      },
      {
        approach: "Optimal",
        code: `public int findDuplicate(int[] nums) {
    int slow = nums[0];
    int fast = nums[0];
    
    // Find intersection point
    do {
        slow = nums[slow];
        fast = nums[nums[fast]];
    } while (slow != fast);
    
    // Find entrance to cycle
    slow = nums[0];
    while (slow != fast) {
        slow = nums[slow];
        fast = nums[fast];
    }
    
    return slow;
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        explanation: "We treat the array as a linked list where nums[i] points to nums[nums[i]]. The duplicate number will create a cycle, which we can find using Floyd's algorithm."
      }
    ],
    leetCodeUrl: "https://leetcode.com/problems/find-the-duplicate-number/",
    difficulty: "Medium",
    category: "linkedList"
  },
  {
    id: 46,
    title: "LRU Cache",
    description: "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache. Implement the LRUCache class: LRUCache(int capacity) Initialize the LR U cache with positive size capacity. int get(int key) Return the value of the key if the key exists, otherwise return -1. void put(int key, int value) Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity from this operation, evict the least recently used key.",
    examples: [
      {
        input: `["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]`,
        output: "[null, null, null, 1, null, -1, null, -1, 3, 4]",
        explanation: "Cache is initialized with capacity = 2."
      }
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `class LRUCache {
    private int capacity;
    private LinkedHashMap<Integer, Integer> cache;
    
    public LRUCache(int capacity) {
        this.capacity = capacity;
        this.cache = new LinkedHashMap<>(capacity, 0.75f, true);
    }
    
    public int get(int key) {
        return cache.getOrDefault(key, -1);
    }
    
    public void put(int key, int value) {
        cache.put(key, value);
        if (cache.size() > capacity) {
            int firstKey = cache.keySet().iterator().next();
            cache.remove(firstKey);
        }
    }
}`,
        timeComplexity: "O(1) average",
        spaceComplexity: "O(capacity)",
        explanation: "We use LinkedHashMap which maintains insertion order. Setting accessOrder to true makes it maintain access order instead."
      },
      {
        approach: "Optimal",
        code: `class LRUCache {
    class Node {
        int key;
        int value;
        Node prev;
        Node next;
        
        Node(int key, int value) {
            this.key = key;
            this.value = value;
        }
    }
    
    private Map<Integer, Node> cache;
    private int capacity;
    private Node head;
    private Node tail;
    
    public LRUCache(int capacity) {
        this.capacity = capacity;
        this.cache = new HashMap<>();
        this.head = new Node(0, 0);
        this.tail = new Node(0, 0);
        head.next = tail;
        tail.prev = head;
    }
    
    public int get(int key) {
        if (cache.containsKey(key)) {
            Node node = cache.get(key);
            removeNode(node);
            addNode(node);
            return node.value;
        }
        return -1;
    }
    
    public void put(int key, int value) {
        if (cache.containsKey(key)) {
            removeNode(cache.get(key));
        }
        
        Node node = new Node(key, value);
        cache.put(key, node);
        addNode(node);
        
        if (cache.size() > capacity) {
            Node lru = head.next;
            removeNode(lru);
            cache.remove(lru.key);
        }
    }
    
    private void addNode(Node node) {
        Node prev = tail.prev;
        prev.next = node;
        node.prev = prev;
        node.next = tail;
        tail.prev = node;
    }
    
    private void removeNode(Node node) {
        Node prev = node.prev;
        Node next = node.next;
        prev.next = next;
        next.prev = prev;
    }
}`,
        timeComplexity: "O(1) for all operations",
        spaceComplexity: "O(capacity)",
        explanation: "We implement our own doubly linked list with a hash map. The linked list maintains the order of elements, while the hash map provides O(1) access."
      }
    ],
    leetCodeUrl: "https://leetcode.com/problems/lru-cache/",
    difficulty: "Medium",
    category: "linkedList"
  },
  {
    id: 47,
    title: "Merge k Sorted Lists",
    description: "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.",
    examples: [
      {
        input: "lists = [[1,4,5],[1,3,4],[2,6]]",
        output: "[1,1,2,3,4,4,5,6]",
        explanation: "The linked-lists are merged into one sorted list."
      },
      {
        input: "lists = []",
        output: "[]"
      }
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
        explanation: "We collect all values in an array, sort them, and create a new linked list."
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
        explanation: "We use a min heap to always get the smallest value among the current nodes from each list."
      }
    ],
    leetCodeUrl: "https://leetcode.com/problems/merge-k-sorted-lists/",
    difficulty: "Hard",
    category: "linkedList"
  }
];