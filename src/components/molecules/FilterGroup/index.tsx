import React, { useCallback, useEffect, useState } from 'react'
import Text from 'components/atoms/Text'
import Box from 'components/layout/Box'
import CheckBox from 'components/molecules/CheckBox'

type Item = {
  label: string
  name: string
}

type FilterGroupProps = {
  title: string
  items: Item[]
  value?: string[]
  defaultValue?: string[]
  onChange?: (values: string[]) => void
}

/**
 * フィルターグループ
 */
const FilterGroup = ({
  title,
  items,
  value = [],
  defaultValue = [],
  onChange,
}: FilterGroupProps) => {
  const [selected, setSelected] = useState(value ?? defaultValue)

  // valueに変更があれば更新
  useEffect(() => {
    setSelected(value)
  }, [value])

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.name
      const newSelected = e.target.checked
        ? [...selected, value]
        : selected.filter((v) => v !== value)

      setSelected(newSelected)
      onChange && onChange(newSelected)
    },
    [onChange, selected],
  )

  return (
    <>
      <Text fontWeight="bold" variant="mediumLarge">
        {title}
      </Text>
      <Box marginTop={2}>
        {items.map(({ label, name }, i) => (
          <Box key={i} marginTop={i === 0 ? 0 : '4px'}>
            <CheckBox
              name={name}
              label={label}
              checked={!!selected.find((e) => e === name)} // boolean型を返すために二重否定
              onChange={handleChange}
            />
          </Box>
        ))}
      </Box>
    </>
  )
}

export default FilterGroup
