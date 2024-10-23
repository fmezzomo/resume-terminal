import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import Terminal from './components/Terminal';

import * as dataService from './services/dataService';

jest.mock('./services/dataService');

const MOCK_DATA = {
    email: ["example@example.com"],
    skills: ["JavaScript", "React"],
};

const LOADING_TEXT = 'Loading...';

const setup = async () => {
    dataService.fetchCommandData.mockResolvedValueOnce(MOCK_DATA);
    await act(async () => {
        render(<Terminal />);
    });
    await waitFor(() => expect(screen.queryByText(LOADING_TEXT)).not.toBeInTheDocument());
};

describe('Terminal Command Tests', () => {
    test('executes list command with valid category', async () => {
        await setup();

        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'list email' } });
        fireEvent.keyDown(input, { key: 'Enter' });

        expect(await screen.findByText(/example@example\.com/i)).toBeInTheDocument();
    });

    test('executes theme command to change theme', async () => {
        await setup();

        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'theme light' } });
        fireEvent.keyDown(input, { key: 'Enter' });

        expect(await screen.findByText(/Switched to Light Theme/i)).toBeInTheDocument();
    });

    test('executes invalid command and prints error message', async () => {
        await setup();

        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'invalidCommand' } });
        fireEvent.keyDown(input, { key: 'Enter' });

        expect(await screen.findByText(/Command not found/i)).toBeInTheDocument();
    });

    test('executes help command and prints available commands', async () => {
        await setup();

        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'help' } });
        fireEvent.keyDown(input, { key: 'Enter' });

        expect(await screen.findByText(/Available commands/i)).toBeInTheDocument();
    });
});