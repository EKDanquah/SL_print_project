import React from 'react';

// third-party
import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

// ==============================|| CODE HIGHLIGHTER ||============================== //

export default function SyntaxHighlight({ children, ...others }: SyntaxHighlightPropTypes) {
    return (
        <SyntaxHighlighter language="javacript" showLineNumbers style={a11yDark} {...others}>
            {children}
        </SyntaxHighlighter>
    );
}

type SyntaxHighlightPropTypes = {
    children: string | string[];
};
