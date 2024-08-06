import React from 'react'

type Props = {
  text: String
}

const Card = ({ text }: Props) => {
  return (
    <article className="hover:animate-background rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]">
      <div className="rounded-[10px] bg-background !p-32 sm:p-6">
        <h3 className="mt-0.5 text-center text-xl font-medium">{text}</h3>
      </div>
    </article>
  )
}

export default Card
