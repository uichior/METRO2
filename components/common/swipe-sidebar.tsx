"use client"

import React, { useEffect, useState } from "react"
import { useSwipeable } from "react-swipeable"
import { useSidebar } from "@/components/ui/sidebar"

interface SwipeSidebarProps {
  children: React.ReactNode
}

export function SwipeSidebar({ children }: SwipeSidebarProps) {
  const { setOpen, setOpenMobile, isMobile } = useSidebar()
  const [isSwipeActive, setIsSwipeActive] = useState(false)

  // スワイプ検出のためのハンドラー
  const handlers = useSwipeable({
    onSwipedRight: (eventData) => {
      // 画面の左端から始まるスワイプの場合のみ反応
      if (eventData.initial[0] < 30) {
        if (isMobile) {
          setOpenMobile(true)
        } else {
          setOpen(true)
        }
        setIsSwipeActive(true)
      }
    },
    onSwipedLeft: () => {
      if (isMobile) {
        setOpenMobile(false)
      } else {
        setOpen(false)
      }
      setIsSwipeActive(false)
    },
    // スワイプの感度設定
    delta: 10,
    trackTouch: true,
    trackMouse: false,
  })

  // 画面のどこかをクリックしたらサイドバーを閉じる
  useEffect(() => {
    const handleClickOutside = () => {
      if (isSwipeActive) {
        if (isMobile) {
          setOpenMobile(false)
        } else {
          setOpen(false)
        }
        setIsSwipeActive(false)
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [isSwipeActive, setOpen, setOpenMobile, isMobile])

  return (
    <div {...handlers} className="h-full w-full">
      {children}
    </div>
  )
}
