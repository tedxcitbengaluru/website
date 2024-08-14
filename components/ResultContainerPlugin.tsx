import React from 'react';

interface ResultContainerPluginProps {
    results: Array<any>;
}

const ResultContainerPlugin: React.FC<ResultContainerPluginProps> = ({ results }) => {
    return (
        <div className="Result-container">
            <h2 className="Result-header">Scanned Results</h2>
            <table>
                <thead>
                    <tr>
                        <th>Result</th>
                        <th>Format</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((result, index) => (
                        <tr key={index}>
                            <td>{result.decodedText}</td>
                            <td>{result.result.format.formatName}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ResultContainerPlugin;
