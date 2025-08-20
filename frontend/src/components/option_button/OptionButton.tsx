import { Edit } from 'iconsax-react'
import { Trash } from 'iconsax-react'

export const OptionButton = () => {
  return (
    <div className='flex justify-end border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400'>
      <button type="submit" className='mx-8'><Edit size="28" color="black"/></button>
      <button type="submit" className='m-1'><Trash size="28" color="black"/></button>
    </div>
  )
}
