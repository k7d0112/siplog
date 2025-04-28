import Page from '@/app/(loginSignin)/login/page';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { supabase } from '@/app/_libs/supabase';

jest.mock('@/app/_libs/supabase', () => ({
  supabase: {
    auth: {
      signInWithPassword: jest.fn(),
    },
  },
}));

const replace = jest.fn();
const push = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    replace,
    push,
  }),
}));

describe('Test Login', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('正常にログインできるかのテスト', async () => {
    (supabase.auth.signInWithPassword as jest.Mock).mockResolvedValueOnce({
      error: null,
    });

    render(<Page/>);

    const emailInput = screen.getByPlaceholderText('hogehoge@gmail.com');
    const passwordInput = screen.getByPlaceholderText('････････');
    const loginButton = screen.getByRole('button', { name: /ログイン/ });

    fireEvent.change(emailInput, { target: {value: 'test@example.com'}});
    fireEvent.change(passwordInput, { target: {value: 'password123'}});
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });

  test('ログイン失敗時にアラートが表示されるかのテスト', async () => {
    window.alert = jest.fn();

    (supabase.auth.signInWithPassword as jest.Mock).mockResolvedValueOnce({
      error: { message: 'ログインエラー' },
    });

    render(<Page/>);

    const emailInput = screen.getByPlaceholderText('hogehoge@gmail.com');
    const passwordInput = screen.getByPlaceholderText('････････');
    const loginButton = screen.getByRole('button', { name: /ログイン/ });

    fireEvent.change(emailInput, { target: { value: 'wrong@example.com'}});
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword'}});
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        'ログインに失敗しました。入力内容を確認し再度ログインしてください。'
      );
    });
  });

  test('ログイン成功後に、/usersへリダイレクトされるかのテスト', async () => {
    (supabase.auth.signInWithPassword as jest.Mock).mockResolvedValueOnce({
      error: null,
    });

    render(<Page/>);

    const emailInput = screen.getByPlaceholderText('hogehoge@gmail.com');
    const passwordInput = screen.getByPlaceholderText('････････');
    const loginButton = screen.getByRole('button', { name: /ログイン/ });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' }});
    fireEvent.change(passwordInput, { target: { value:'password123' }});
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(replace).toHaveBeenCalledWith('/users');
    });
  });
});