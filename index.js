import React, { useState, useEffect, useRef, useCallback } from 'react'
import classNames from 'classnames'

const DEFAULT_PLACEHOLDER_STRING = 'Select...'

const Dropdown = (props) => {
  const parseValue = (value, options) => {
    let option

    if (typeof value === 'string') {
      for (let i = 0, num = options.length; i < num; i++) {
        if (options[i].type === 'group') {
          const match = options[i].items.filter(item => item.value === value)
          if (match.length) {
            option = match[0]
          }
        } else if (typeof options[i].value !== 'undefined' && options[i].value === value) {
          option = options[i]
        }
      }
    }

    return option || value
  }

  const [state, setState] = useState({
    selected: parseValue(props.value, props.options) || {
      label: typeof props.placeholder === 'undefined' ? DEFAULT_PLACEHOLDER_STRING : props.placeholder,
      value: ''
    },
    isOpen: false,
    isFocused: false
  })

  const dropdownRef = useRef(null)
  const mounted = useRef(true)

  useEffect(() => {
    // Component mount
    document.addEventListener('click', handleDocumentClick, false)
    document.addEventListener('touchend', handleDocumentClick, false)

    return () => {
      // Component unmount
      mounted.current = false
      document.removeEventListener('click', handleDocumentClick, false)
      document.removeEventListener('touchend', handleDocumentClick, false)
    }
  }, [])

  useEffect(() => {
    // Handle value prop changes
    if (props.value) {
      const selected = parseValue(props.value, props.options)
      if (selected !== state.selected) {
        setState(prevState => ({ ...prevState, selected }))
      }
    } else {
      setState(prevState => ({
        ...prevState,
        selected: {
          label: typeof props.placeholder === 'undefined' ? DEFAULT_PLACEHOLDER_STRING : props.placeholder,
          value: ''
        }
      }))
    }
  }, [props.value, props.options, props.placeholder])

  const handleDocumentClick = (event) => {
    if (mounted.current) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        if (state.isOpen) {
          setState(prevState => ({ ...prevState, isOpen: false, isFocused: false }))
        }
      }
    }
  }

  const closeDropdown = () => {
    setState(prevState => ({ ...prevState, isOpen: false, isFocused: false }))
  }

  const openDropdown = () => {
    setState(prevState => ({ ...prevState, isOpen: true, isFocused: true }))
  }

  const handleMouseDown = (event) => {
    if (props.onFocus && typeof props.onFocus === 'function') {
      props.onFocus(state.isOpen)
    }
    if (event.type === 'mousedown' && event.button !== 0) return
    event.stopPropagation()
    event.preventDefault()

    if (!props.disabled) {
      setState(prevState => ({ ...prevState, isOpen: !prevState.isOpen }))
    }
  }

  const handleKeyDown = (event) => {
    // event.stopPropagation()
    // event.preventDefault()

    console.log('Key: ', event.key)

    if (event.key === 'Enter') {
      if (props.onFocus && typeof props.onFocus === 'function') {
        props.onFocus(state.isOpen)
      }

      if (!props.disabled) {
        setState(prevState => ({ ...prevState, isOpen: !prevState.isOpen }))
      }
    }
  }

  const setValue = (value, label) => {
    const newSelected = { value, label }

    if (newSelected !== state.selected && props.onChange) {
      props.onChange(newSelected)
    }

    setState({
      selected: newSelected,
      isOpen: false
    })
  }

  const isDropdown = useCallback((el) => el.classList.contains(`${props.baseClassName}-option`) || el.classList.contains(`${props.baseClassName}-root`), [props])

  const renderOption = (option) => {
    let value = option.value
    if (typeof value === 'undefined') {
      value = option.label || option
    }
    let label = option.label || option.value || option
    let isSelected = value === state.selected.value || value === state.selected

    const classes = {
      [`${props.baseClassName}-option`]: true,
      [option.className]: !!option.className,
      'is-selected': isSelected
    }

    const optionClass = classNames(classes)

    const dataAttributes = Object.keys(option.data || {}).reduce(
      (acc, dataKey) => ({
        ...acc,
        [`data-${dataKey}`]: option.data[dataKey]
      }),
      {}
    )

    return (
      <div
        key={value}
        className={optionClass}
        onMouseDown={() => setValue(value, label)}
        onClick={() => setValue(value, label)}
        onBlur={(e) => {
          if (!isDropdown(e.relatedTarget)) {
            closeDropdown()
          }
        }}
        role='option'
        tabIndex='0'
        aria-selected={isSelected ? 'true' : 'false'}
        {...dataAttributes}
      >
        {label}
      </div>
    )
  }

  const buildMenu = () => {
    let { options, baseClassName } = props
    let ops = options.map((option) => {
      if (option.type === 'group') {
        let groupTitle = (
          <div className={`${baseClassName}-title`}>
            {option.name}
          </div>
        )
        let _options = option.items.map((item) => renderOption(item))

        return (
          <div className={`${baseClassName}-group`} key={option.name} role='listbox' tabIndex='-1'>
            {groupTitle}
            {_options}
          </div>
        )
      } else {
        return renderOption(option)
      }
    })

    return ops.length ? ops : (
      <div className={`${baseClassName}-noresults`}>
        No options found
      </div>
    )
  }

  const isValueSelected = () => {
    return typeof state.selected === 'string' || state.selected.value !== ''
  }

  const { baseClassName, controlClassName, placeholderClassName, menuClassName, arrowClassName, arrowClosed, arrowOpen, className } = props

  const disabledClass = props.disabled ? 'Dropdown-disabled' : ''
  const placeHolderValue = typeof state.selected === 'string' ? state.selected : state.selected.label

  const dropdownClass = classNames({
    [`${baseClassName}-root`]: true,
    [className]: !!className,
    'is-open': state.isOpen,
    'is-focused': state.isFocused
  })
  const controlClass = classNames({
    [`${baseClassName}-control`]: true,
    [controlClassName]: !!controlClassName,
    [disabledClass]: !!disabledClass
  })
  const placeholderClass = classNames({
    [`${baseClassName}-placeholder`]: true,
    [placeholderClassName]: !!placeholderClassName,
    'is-selected': isValueSelected()
  })
  const menuClass = classNames({
    [`${baseClassName}-menu`]: true,
    [menuClassName]: !!menuClassName
  })
  const arrowClass = classNames({
    [`${baseClassName}-arrow`]: true,
    [arrowClassName]: !!arrowClassName
  })

  const value = (
    <div className={placeholderClass}>
      {placeHolderValue}
    </div>
  )

  const menu = state.isOpen ? (
    <div className={menuClass} aria-expanded='true'>
      {buildMenu()}
    </div>
  ) : null

  return (
    <div ref={dropdownRef} className={dropdownClass}>
      <div
        className={controlClass}
        role='menu'
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onMouseDown={handleMouseDown}
        onFocus={openDropdown}
        onBlur={(e) => {
          if (!isDropdown(e.relatedTarget)) {
            closeDropdown()
          }
        }}
        onTouchEnd={handleMouseDown}
        aria-haspopup='listbox'
      >
        {value}
        <div className={`${baseClassName}-arrow-wrapper`}>
          {arrowOpen && arrowClosed
            ? state.isOpen ? arrowOpen : arrowClosed
            : <span className={arrowClass} />}
        </div>
      </div>
      {menu}
    </div>
  )
}

Dropdown.defaultProps = { baseClassName: 'Dropdown' }
export default Dropdown
