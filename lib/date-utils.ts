// lib/date-utils.ts

// 1. 기간 계산 함수 (약 O개월 소요)
export function calculateDuration(startDate: string | Date, endDate?: string | Date): string {
  const start = new Date(startDate)
  const end = endDate ? new Date(endDate) : new Date() 

  const years = end.getFullYear() - start.getFullYear()
  const months = end.getMonth() - start.getMonth()
  let totalMonths = years * 12 + months
  
  if (totalMonths < 0) totalMonths = 0
  
  if (totalMonths < 12) {
    return totalMonths === 0 ? "약 1개월 미만" : `약 ${totalMonths}개월`
  }

  const displayYears = Math.floor(totalMonths / 12)
  const displayMonths = totalMonths % 12
  
  if (displayMonths === 0) {
    return `약 ${displayYears}년`
  }
  
  return `약 ${displayYears}년 ${displayMonths}개월`
}

// 2. 월까지만 보여주는 함수 (YYYY.MM)
export function formatMonth(dateString: string | Date): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit", // 01, 02 두 자리 숫자
  }).replace(/\.$/, "") // 마지막 점 제거 (2024. 01. -> 2024. 01)
}