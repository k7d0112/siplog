import Page from '@/app/(loginSignin)/login/page';
import { render, screen } from '@testing-library/react';

describe('Test Login Component', () => {
  test('render form with 2 button', async () => {
    render(<Page/>);
    // const buttonList = await screen.findAllByRole('button');
    // expect(buttonList).toHaveLength(3);
    const loginButton = screen.getByRole('button', { name: 'ログイン' });
    expect(loginButton).toBeInTheDocument();
  });
});