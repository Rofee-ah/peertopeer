import React from 'react';
import Image from 'next/image';

const Trade = () => {
  return (
    <div>


<section className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid items-center gap-12 md:grid-cols-2">
          
          {/* TEXT CONTENT */}
          <div className="space-y-10">
            {/* Headline */}
            <h1 className="text-4xl font-bold leading-tight md:text-6xl">
              Trade secure.
              <br />
              Trade{" "}
              <span className="text-blue-600 italic">local.</span>
            </h1>

            {/* Features */}
            <div className="space-y-6">
              {/* Feature 1 */}
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-800">
                  🛡️
                </div>
                <div>
                  <h3 className="text-lg font-semibold">
                    UI Exclusive Network
                  </h3>
                  <p className="text-sm text-gray-400">
                    Access is limited strictly to students with
                    @stu.ui.edu.ng or @dlc.ui.edu.ng domains.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-800">
                  ✉️
                </div>
                <div>
                  <h3 className="text-lg font-semibold">
                    Secure Email Flow
                  </h3>
                  <p className="text-sm text-gray-400">
                    No in-app chat or payments. Connect via automated
                    secure email inquiries.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-800">
                  ⏱️
                </div>
                <div>
                  <h3 className="text-lg font-semibold">
                    Auto-Cleanup
                  </h3>
                  <p className="text-sm text-gray-400">
                    Outdated posts expire automatically. No ghost
                    listings, no outdated hostel gears.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* IMAGE */}
          <div className="relative h-[280px] w-full overflow-hidden rounded-3xl sm:h-[380px] md:h-[450px]">
            <Image
              src="/image/exchange.png" 
              alt="Students trading items on campus"
              fill
              className="object-cover"
              priority
            />
          </div>

        </div>
      </div>
    </section>
    </div>
  )
}

export default Trade