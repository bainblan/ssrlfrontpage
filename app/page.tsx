import ThreeScene from "./components/ThreeScene";

export default function Home() {
  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[999] bg-black/70 flex items-center justify-between px-[2vw] min-h-[50px]">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="h-10 w-auto" src="/images/ssrl.svg" alt="SSRL Logo" />
        </div>
        <ul className="flex items-center m-0 p-0">
          <li><a className="block text-[#9d9d9d] text-center px-3 py-3.5 no-underline font-['Azeret_Mono',monospace] text-xs transition-colors duration-200 hover:text-white" href="#">Missions</a></li>
          <li><a className="block text-[#9d9d9d] text-center px-3 py-3.5 no-underline font-['Azeret_Mono',monospace] text-xs transition-colors duration-200 hover:text-white" href="#">Media</a></li>
          <li><a className="block text-[#9d9d9d] text-center px-3 py-3.5 no-underline font-['Azeret_Mono',monospace] text-xs transition-colors duration-200 hover:text-white" href="#">Publications</a></li>
          <li><a className="block text-[#9d9d9d] text-center px-3 py-3.5 no-underline font-['Azeret_Mono',monospace] text-xs transition-colors duration-200 hover:text-white" href="#">Software</a></li>
          <li><a className="block text-[#9d9d9d] text-center px-3 py-3.5 no-underline font-['Azeret_Mono',monospace] text-xs transition-colors duration-200 hover:text-white" href="#">Partners</a></li>
          <li><a className="block text-[#9d9d9d] text-center px-3 py-3.5 no-underline font-['Azeret_Mono',monospace] text-xs transition-colors duration-200 hover:text-white" href="#">Our Organization</a></li>
          <li><a className="block text-[#9d9d9d] text-center px-3 py-3.5 no-underline font-['Azeret_Mono',monospace] text-xs transition-colors duration-200 hover:text-white" href="#">Apply</a></li>
          <li><a className="block text-[#9d9d9d] text-center px-3 py-3.5 no-underline font-['Azeret_Mono',monospace] text-xs transition-colors duration-200 hover:text-white" href="#">Contact Us</a></li>
          <li><a className="block font-['Azeret_Mono',monospace] text-xs transition-colors duration-200 bg-white text-black font-extrabold px-3.5 py-1.5 ml-1 hover:bg-[#ddd]" href="#">Donate</a></li>
        </ul>
      </nav>

      <ThreeScene />

      <main className="w-full text-white z-[99] absolute flex flex-col items-center gap-120 px-[8%] py-4">

        <div className="min-h-screen flex w-full items-center">
          <div className="max-w-2xl flex flex-col gap-2">
            <header className="bg-gray-500/80 rounded-lg p-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="w-full h-auto block" src="/ssrl_logo_long-new.png" alt="UGA Small Satellite Research Laboratory" />
            </header>

            <blockquote className="m-0 p-0 flex items-center justify-between">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="flex-1 w-0 h-auto object-contain px-2" src="/images/unp_logo3.png" alt="UNP Logo" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="flex-1 w-0 h-auto object-contain px-2" src="/images/nasa_logo.png" alt="NASA Logo" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="flex-1 w-0 h-auto object-contain px-2" src="/images/air_force_logo.png" alt="Air Force Logo" />
            </blockquote>
          </div>
        </div>

        <div className="w-full max-w-9xl flex flex-col gap-120">
          <section className="max-w-2xl p-4 bg-gray-500/80 rounded-lg text-xl">
            The Small Satellite Research Laboratory (SSRL) is developing and launching new and innovative technologies into
            space by utilizing the CubeSat platform, a small-scale satellite that is designed for rapid integration and
            development. The lab is currently driving technological innovation at UGA through the building of 2 satellites,
            funded by the Air Force and NASA. The UGA SSRL was founded in 2016, primarily as an avenue for undergraduates to
            design, build, and test space-ready components. Over the past three years, the SSRL has steadily increased the
            reach of its research, student involvement, and community enrichment.
          </section>

          <section className="max-w-2xl self-end p-4 bg-gray-500/80 rounded-lg text-xl">
            <h2 className="text-5xl">SPOC</h2>
            <h3 className="text-2xl">Spectral Ocean Color Satellite</h3>
            <p className="text-sm">
              The CubeSat is a new standard that allows students to access space like never before. We can design, build, and
              control our own miniature spacecraft. CubeSat&apos;s are a class of small satellites composed of modular units
              10cmx10cmx10cm in size, but the entire satellite cannot be larger than 1.33kg. Scroll down and let us give you
              an example walk through of what is in a typical CubeSat.
            </p>
          </section>

          <section className="max-w-2xl p-4 bg-gray-500/80 rounded-lg text-xl">
            <h2 className="text-3xl">Solar Panels</h2>
            <p>
              Like any other space craft, a CubeSat needs energy to survive. Solar panels provide the satellite with energy so
              that it can power its systems. Solar panels are the standard of power generation in Low Earth Orbit.
            </p>
          </section>

          <section className="max-w-2xl self-end p-4 bg-gray-500/80 rounded-lg text-xl">
            <h2 className="text-3xl">The Frame</h2>
            <p>
              The frame of the CubeSat holds the parts of the satellite in place like the payloads and core avionics. The
              frame also helps dissipate excess heat while the satellite is in orbit. When the satellite is launched, the
              frame helps ensure that all of the parts stay in place and the system is structurally stable.
            </p>
          </section>

          <section className="max-w-2xl p-4 bg-gray-500/80 rounded-lg text-xl">
            <h2 className="text-3xl">ADCS</h2>
            <p>
              The ADCS is the satellite&apos;s Attitude Determination and Control System. This is what lets the CubeSat move around
              and reorient itself in space. While not all CubeSat missions require an ADCS, most missions that require some
              level of precision will.
            </p>
          </section>

          <section className="max-w-2xl self-end p-4 bg-gray-500/80 rounded-lg text-xl">
            <h2 className="text-3xl">The Payload</h2>
            <p>
              The payload of the CubeSat is the instrument that gathers the primary scientific data in orbit. Every mission
              has a different payload, so here we have an example camera payload. This system could image the Earth in fine
              detail from Low Earth Orbit.
            </p>
          </section>

          <section className="max-w-2xl p-4 bg-gray-500/80 rounded-lg text-xl">
            <h2 className="text-3xl">The Computer</h2>
            <p>
              At the heart of the CubeSat is the computer, but don&apos;t let its size fool you. Though it may be small, it can be
              more powerful than the Apollo moon mission&apos;s flight computers. Thanks to smart phones, we are able to cram more
              computational power into a small space than ever before. In some cases, these boards can even run a Linux
              kernel. Our lab focuses on making these computers stronger and better suited for the space environment.
            </p>
          </section>
        </div>

        <div className="min-h-screen w-full flex items-center justify-center">
          <section className="max-w-2xl p-4 bg-gray-500/80 rounded-lg text-xl">
            <h2 className="text-3xl">Our Spacecraft</h2>
            <p>The spacecraft that we design, build, and test in the Small Satellite Research Laboratory (as well as most
              CubeSats in general) are all similar to this design. If you are a student with an interest in spacecraft, why
              don&apos;t you join us?
            </p>
          </section>
        </div>
      </main>
    </>
  );
}