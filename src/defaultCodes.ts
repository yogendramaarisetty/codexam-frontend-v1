const defaultCodes = [
    { id: 'javascript', name: 'JavaScript', extension: 'js', defaultCode: `function twoSum(nums, target) {
    // Your code here
  }
  
  // Example usage:
  const nums = [2, 7, 11, 15];
  const target = 9;
  console.log(twoSum(nums, target));` },
    { id: 'python', name: 'Python', extension: 'py', defaultCode: `def two_sum(nums, target):
      # Your code here
      pass
  
  # Example usage:
  nums = [2, 7, 11, 15]
  target = 9
  print(two_sum(nums, target))` },
    { id: 'java', name: 'Java', extension: 'java', defaultCode: `import java.util.*;
  
  class Solution {
      public int[] twoSum(int[] nums, int target) {
          // Your code here
          return new int[]{};
      }
  
      public static void main(String[] args) {
          Solution solution = new Solution();
          int[] nums = {2, 7, 11, 15};
          int target = 9;
          System.out.println(Arrays.toString(solution.twoSum(nums, target)));
      }
  }` },
    { id: 'cpp', name: 'C++', extension: 'cpp', defaultCode: `#include <vector>
  #include <iostream>
  
  class Solution {
  public:
      std::vector<int> twoSum(std::vector<int>& nums, int target) {
          // Your code here
          return {};
      }
  };
  
  int main() {
      Solution solution;
      std::vector<int> nums = {2, 7, 11, 15};
      int target = 9;
      std::vector<int> result = solution.twoSum(nums, target);
      for (int i : result) {
          std::cout << i << " ";
      }
      std::cout << std::endl;
      return 0;
  }` },
    { id: 'typescript', name: 'TypeScript', extension: 'ts', defaultCode: `function twoSum(nums: number[], target: number): number[] {
      // Your code here
      return [];
  }
  
  // Example usage:
  const nums: number[] = [2, 7, 11, 15];
  const target: number = 9;
  console.log(twoSum(nums, target));` },
  ]

export default defaultCodes;