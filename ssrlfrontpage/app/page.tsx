import ThreeScene from "./components/ThreeScene";

export default function Home() {
  return (
    <>
      <nav className="navbar">
        <div className="nav-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/ssrl.svg" alt="SSRL Logo" />
        </div>
        <ul className="nav-links">
          <li><a href="#">Missions</a></li>
          <li><a href="#">Media</a></li>
          <li><a href="#">Publications</a></li>
          <li><a href="#">Software</a></li>
          <li><a href="#">Partners</a></li>
          <li><a href="#">Our Organization</a></li>
          <li><a href="#">Apply</a></li>
          <li><a href="#">Contact Us</a></li>
          <li><a href="#" className="donate-link">Donate</a></li>
        </ul>
      </nav>

      <ThreeScene />

      <main>
        <header>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/ssrl_logo_long-new.png" alt="UGA Small Satellite Research Laboratory" />
        </header>

        <blockquote className="logos">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/unp_logo3.png" alt="UNP Logo" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/nasa_logo.png" alt="NASA Logo" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/air_force_logo.png" alt="Air Force Logo" />
        </blockquote>

        <section>
          <p>
            The Small Satellite Research Laboratory (SSRL) is developing and launching new and innovative technologies into
            space by utilizing the CubeSat platform, a small-scale satellite that is designed for rapid integration and
            development. The lab is currently driving technological innovation at UGA through the building of 2 satellites,
            funded by the Air Force and NASA. The UGA SSRL was founded in 2016, primarily as an avenue for undergraduates to
            design, build, and test space-ready components. Over the past three years, the SSRL has steadily increased the
            reach of its research, student involvement, and community enrichment.
          </p>
        </section>

        <section>
          <h2>📜 The CubeSat</h2>
          <p>
            The CubeSat is a new standard that allows students to access space like never before. We can design, build, and
            control our own miniature spacecraft. CubeSat&apos;s are a class of small satellites composed of modular units
            10cmx10cmx10cm in size, but the entire satellite cannot be larger than 1.33kg. Scroll down and let us give you
            an example walk through of what is in a typical CubeSat.
          </p>
        </section>

        <section className="light">
          <h2>👩🏽‍🚀 Solar Panels</h2>
          <p>
            Like any other space craft, a CubeSat needs energy to survive. Solar panels provide the satellite with energy so
            that it can power its systems. Solar panels are the standard of power generation in Low Earth Orbit.
          </p>

          <h2>🏆 The Frame</h2>
          <p>
            The frame of the CubeSat holds the parts of the satellite in place like the payloads and core avionics. The
            frame also helps dissipate excess heat while the satellite is in orbit. When the satellite is launched, the
            frame helps ensure that all of the parts stay in place and the system is structurally stable.
          </p>
        </section>

        <blockquote>
          <p>The best way out is always through <br />-Robert Frost</p>
        </blockquote>

        <section className="left">
          <h3>ADCS</h3>
          <p>
            The ADCS is the satellite&apos;s Attitude Determination and Control System. This is what lets the CubeSat move around
            and reorient itself in space. While not all CubeSat missions require an ADCS, most missions that require some
            level of precision will.
          </p>
          <h3>The Payload</h3>
          <p>
            The payload of the CubeSat is the instrument that gathers the primary scientific data in orbit. Every mission
            has a different payload, so here we have an example camera payload. This system could image the Earth in fine
            detail from Low Earth Orbit.
          </p>
          <h3>The Computer</h3>
          <p>
            At the heart of the CubeSat is the computer, but don&apos;t let its size fool you. Though it may be small, it can be
            more powerful than the Apollo moon mission&apos;s flight computers. Thanks to smart phones, we are able to cram more
            computational power into a small space than ever before. In some cases, these boards can even run a Linux
            kernel. Our lab focuses on making these computers stronger and better suited for the space environment.
          </p>
        </section>

        <blockquote>
          <p>Our Spacecraft</p>
          <h2>The spacecraft that we design, build, and test in the Small Satellite Research Laboratory (as well as most
            CubeSats in general) are all similar to this design. If you are a student with an interest in spacecraft, why
            don&apos;t you join us?</h2>
        </blockquote>
      </main>
    </>
  );
}
