import useSWR from 'swr'
import type { ApiContext, User } from 'types'

/**
 * 取得するユーザーID
 * 初期状態
 */
export type UseUserProps = {
  id: number
  initialUser?: User
}

/**
 * 取得するユーザー
 * ロードディングフラグ
 * エラーフラグ
 */
export type UseUser = {
  user?: User
  isLoading: boolean
  isError: boolean
}

/**
 * ユーザーAPI（個別取得）のカスタムフック
 * 取得したいユーザー情報を特定するcontextとid。取得できなかったときのinitialUserをPropsから受け取る
 * Propsから受け取った情報でuseSWRを使用してレコード/errorを取得して返す
 * @param context APIコンテキスト
 * @returns ユーザーとAPI呼び出しの状態
 */
const useUser = (
  context: ApiContext,
  { id, initialUser }: UseUserProps,
): UseUser => {
  const { data, error } = useSWR<User>(
    `${context.apiRootUrl.replace(/\/$/g, '')}/users/${id}`,
  )

  return {
    user: data ?? initialUser,
    isLoading: !error && !data,
    isError: !!error,
  }
}

export default useUser
