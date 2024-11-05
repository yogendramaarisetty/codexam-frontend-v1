import { useState } from 'react';
import { Editor } from '@monaco-editor/react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronDown, ChevronUp, Play, Terminal } from 'lucide-react';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import defaultCodes from './defaultCodes';

const LANGUAGES = defaultCodes;
  

export default function Component() {
  const [language, setLanguage] = useState(LANGUAGES[0].id);
  const [code, setCode] = useState(LANGUAGES[0].defaultCode);
  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isOutputCollapsed, setIsOutputCollapsed] = useState(false);

  const handleRunCode = async () => {
    setIsRunning(true);

    const url = 'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true&fields=*';
    const options = {
      method: 'POST',
      headers: {
        'x-rapidapi-key': 'cf4305d31bmsh82518687544739ep179fd2jsnf6d65d6ee270',
        'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        language_id: 71,
        source_code: code,
        stdin: 'SnVkZ2Uw'
      }),
    };

    try {
      const response = await fetch(url, options);
      const result = await response.text();

      setOutput(result || 'Code executed successfully!');
      console.log(result);
    } catch (error) {
      console.error(error);
      setOutput(`Error executing code. Please try again.${error}`);
    }
    finally {
      setIsRunning(false);
    }
  };

  const toggleOutputCollapse = () => {
    setIsOutputCollapsed(!isOutputCollapsed);
    const bottomPane = document.querySelector('.bottom-pane');
    // if (bottomPane) {
    //   if (!isOutputCollapsed) {
    //     // Collapse
    //     bottomPane.setAttribute('data-state', 'collapsed');
    //     bottomPane.style.flexGrow = '0';
    //     bottomPane.style.flexBasis = '10%'; // 8% of 400px (typical panel height)
    //   } else {
    //     // Expand
    //     bottomPane.setAttribute('data-state', 'expanded');
    //     bottomPane.style.flexGrow = '1';
    //     bottomPane.style.flexBasis = '30%'; // 30% of 400px (typical panel height)
    //   }
    // }
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    const selectedLanguage = LANGUAGES.find(lang => lang.id === newLanguage);
    if (selectedLanguage) {
      setCode(selectedLanguage.defaultCode);
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

          <ResizablePanel defaultSize={60} minSize={40}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={70}>
                <Card className="h-full rounded-none border-0">
                  <div className="border-b p-4">
                    <div className="flex items-center justify-between">
                      <Select value={language} onValueChange={handleLanguageChange}>
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

              <ResizablePanel
                defaultSize={30}
                collapsible={true}
                collapsedSize={8}
                minSize={10}
                className='bottom-pane'
                onCollapse={() => setIsOutputCollapsed(true)}
                onExpand={() => setIsOutputCollapsed(false)}
              >
                <Card className="h-full rounded-none border-0">
                  <div className="border-b p-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Terminal className="h-4 w-4" />
                      <span className="font-semibold">Output</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={handleRunCode}
                        disabled={isRunning}
                        className="gap-2"
                      >
                        <Play className="h-4 w-4" />
                        {isRunning ? 'Running...' : 'Run Code'}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleOutputCollapse()}
                        aria-label={isOutputCollapsed ? "Expand output" : "Collapse output"}
                      >
                        {isOutputCollapsed ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <ScrollArea className={`transition-all duration-300 ease-in-out ${isOutputCollapsed ? 'h-0' : 'h-[calc(100%-4rem)]'}`}>
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