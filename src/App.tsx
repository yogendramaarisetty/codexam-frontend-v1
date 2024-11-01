import { useState } from 'react';
import { Editor } from '@monaco-editor/react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Play, Terminal } from 'lucide-react';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

const LANGUAGES = [
  { id: 'javascript', name: 'JavaScript', extension: 'js' },
  { id: 'python', name: 'Python', extension: 'py' },
  { id: 'java', name: 'Java', extension: 'java' },
  { id: 'cpp', name: 'C++', extension: 'cpp' },
  { id: 'typescript', name: 'TypeScript', extension: 'ts' },
];

const DEFAULT_CODE = `// Write your code here
function solution(input) {
  return input;
}`;

function App() {
  const [language, setLanguage] = useState(LANGUAGES[0].id);
  const [code, setCode] = useState(DEFAULT_CODE);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const { toast } = useToast();

  const handleRunCode = async () => {
    setIsRunning(true);
    try {
      // Replace with your actual judge API endpoint
      const response = await fetch('https://api.judge0.com/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source_code: code,
          language_id: language,
        }),
      });

      if (!response.ok) throw new Error('Failed to execute code');

      const result = await response.json();
      setOutput(result.output || 'Code executed successfully!');
      toast({
        title: 'Success',
        description: 'Code executed successfully!',
      });
    } catch (error) {
      setOutput('Error executing code. Please try again.');
      toast({
        title: 'Error',
        description: 'Failed to execute code. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="h-screen bg-background flex flex-col">
      <header className="border-b p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Code Judge Platform</h1>
        </div>
      </header>

      <main className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={40} minSize={30}>
            <Card className="h-full rounded-none border-0">
              <ScrollArea className="h-full p-6">
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">Two Sum</h2>
                  <p className="text-muted-foreground">
                    Given an array of integers nums and an integer target, return
                    indices of the two numbers such that they add up to target.
                  </p>
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Example 1:</h3>
                    <pre className="bg-muted p-4 rounded-lg">
                      Input: nums = [2,7,11,15], target = 9{'\n'}
                      Output: [0,1]{'\n'}
                      Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
                    </pre>
                    <h3 className="text-xl font-semibold">Constraints:</h3>
                    <ul className="list-disc list-inside space-y-2">
                      <li>2 ≤ nums.length ≤ 104</li>
                      <li>-109 ≤ nums[i] ≤ 109</li>
                      <li>-109 ≤ target ≤ 109</li>
                    </ul>
                  </div>
                </div>
              </ScrollArea>
            </Card>
          </ResizablePanel>

          <ResizableHandle />

          <ResizablePanel defaultSize={60}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={70}>
                <Card className="h-full rounded-none border-0">
                  <div className="border-b p-4">
                    <div className="flex items-center justify-between">
                      <Select value={language} onValueChange={setLanguage}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          {LANGUAGES.map((lang) => (
                            <SelectItem key={lang.id} value={lang.id}>
                              {lang.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button
                        onClick={handleRunCode}
                        disabled={isRunning}
                        className="gap-2"
                      >
                        <Play className="h-4 w-4" />
                        {isRunning ? 'Running...' : 'Run Code'}
                      </Button>
                    </div>
                  </div>
                  <div className="h-[calc(100%-4rem)]">
                    <Editor
                      height="100%"
                      defaultLanguage="javascript"
                      language={language}
                      value={code}
                      onChange={(value) => setCode(value || '')}
                      theme="vs-dark"
                      options={{
                        fontSize: 14,
                        lineNumbers: 'on',
                        minimap: { enabled: true },
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                        scrollbar: {
                          vertical: 'visible',
                          horizontal: 'visible',
                        },
                        zoomLevel: 1,
                      }}
                    />
                  </div>
                </Card>
              </ResizablePanel>

              <ResizableHandle />

              <ResizablePanel defaultSize={30}>
                <Card className="h-full rounded-none border-0">
                  <div className="border-b p-4 flex items-center gap-2">
                    <Terminal className="h-4 w-4" />
                    <span className="font-semibold">Output</span>
                  </div>
                  <ScrollArea className="h-[calc(100%-4rem)]">
                    <pre className="font-mono p-4 whitespace-pre-wrap">
                      {output || 'Run your code to see the output here'}
                    </pre>
                  </ScrollArea>
                </Card>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </div>
  );
}

export default App;