import React, { useState, useContext, createContext } from 'react'

// booleanのstateのコンテキスト作成
const GlobalSpinnerContext = createContext<boolean>(false)
// booleanのstateのセット関数(Dispatch)のコンテキスト作成
const GlobalSpinnerActionsContext = createContext<
  React.Dispatch<React.SetStateAction<boolean>>
  // eslint-disable-next-line @typescript-eslint/no-empty-function
>(() => {})
// グローバルスピナーの表示・非表示
export const useGlobalSpinnerContext = (): boolean =>
  useContext<boolean>(GlobalSpinnerContext)
// グローバルスピナーの表示・非表示のアクション(Dispatchを返す)
export const useGlobalSpinnerActionsContext = (): React.Dispatch<
  React.SetStateAction<boolean>
> =>
  useContext<React.Dispatch<React.SetStateAction<boolean>>>(
    GlobalSpinnerActionsContext,
  )

interface GlobalSpinnerContextProviderProps {
  children?: React.ReactNode
}
/**
 * グローバルスピナーコンテキストプロバイダー
 * スピナーのstateとそのstateを更新するDispatchをContextでProvideする
 * アプリケーション全体で使用するため、children(pageコンポーネント)を受け取ってcontextでラップする
 */
const GlobalSpinnerContextProvider = ({
  children,
}: GlobalSpinnerContextProviderProps) => {
  const [isGlobalSpinnerOn, setGlobalSpinner] = useState(false)

  return (
    <GlobalSpinnerContext.Provider value={isGlobalSpinnerOn}>
      <GlobalSpinnerActionsContext.Provider value={setGlobalSpinner}>
        {children}
      </GlobalSpinnerActionsContext.Provider>
    </GlobalSpinnerContext.Provider>
  )
}

export default GlobalSpinnerContextProvider
