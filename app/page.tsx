import ThreeScene from "./components/ThreeScene";
import Navbar from "./components/Navbar";
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Navbar />

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
            <section className="max-w-2xl p-4 bg-gray-500/80 rounded-lg text-sm">
              The Small Satellite Research Laboratory (SSRL) is developing and launching new and innovative technologies into
              space by utilizing the CubeSat platform, a small-scale satellite that is designed for rapid integration and
              development. The lab is currently driving technological innovation at UGA through the building of 2 satellites,
              funded by the Air Force and NASA. The UGA SSRL was founded in 2016, primarily as an avenue for undergraduates to
              design, build, and test space-ready components. Over the past three years, the SSRL has steadily increased the
              reach of its research, student involvement, and community enrichment.
            </section>
          </div>
        </div>

        <div className="w-full max-w-9xl flex flex-col gap-160">
          <section id="spoc-section" className="max-w-2xl self-start p-4 bg-gray-500/80 rounded-lg text-xl relative">
            <Image
              className="absolute top-2 right-4 w-36 h-36 object-contain"
              src="/images/SPOC_patch.png"
              alt="SPOC Patch"
              width={144}
              height={144}
            />
            <h2 className="text-5xl">SPOC</h2><br />
            <h3 className="text-2xl">Spectral Ocean<br />Color Satellite</h3>
            <p className="text-sm">
              SPOC is a NASA-funded CubeSat that uses a custom 16-band multispectral imager to monitor coastal ecosystems, ocean color, and water quality from Low Earth Orbit. It captures     imagery between 433-866nm to track vegetation health, phytoplankton dynamics, and suspended sediments in coastal regions. SPOC was launched to the ISS in 2020 and deployed via the Japanese Experiment   Module robotic arm.
            </p>
          </section>

          <section id="learnsat-section" className="max-w-2xl self-start p-4 bg-gray-500/80 rounded-lg text-xl relative">
            <Image
              className="absolute top-2 right-4 w-36 h-36 object-contain"
              src="/images/LEARNSat_MissionPatch.png"
              alt="LEARNSat Patch"
              width={144}
              height={144}
            />
            <h2 className="text-5xl">LEARNSat</h2><br />
            <h3 className="text-2xl">Low-Entry Accessible<br />Research Network</h3>
            <p className="text-sm">
              The rapid growth of space technology has opened new frontiers, yet many K-12 institutions lack access to the resources that inspire innovation in this field. LEARNSat is changing that. Designed specifically for high school students, LEARNSat provides affordable CubeSat kits and a comprehensive curriculum, allowing students to build and launch their own satellites through suborbital missions using weather balloons.
            </p>
          </section>

          <section id="cosmo-section" className="max-w-2xl p-4 bg-gray-500/80 rounded-lg text-xl relative">
            <Image
              className="absolute top-2 right-4 w-36 h-36 object-contain"
              src="/images/Cosmo_patch.png"
              alt="COSMO Patch"
              width={144}
              height={144}
            />
            <h2 className="text-5xl">COSMO</h2><br />
            <h3 className="text-2xl">Center for Orbital<br />Satellite Mission Operations</h3>
            <p className="text-sm">
              The Center for Orbital Satellite Mission Operations (COSMO) serves as the communications center for the University of Georgia
              Small Satellite Research Laboratory (SSRL). COSMO oversees ground station operations from our on-campus rotator installation;
              along with mission radio support, testing, and implementations.
            </p>
          </section>

          <section id="memesat-section" className="max-w-2xl self-start p-4 bg-gray-500/80 rounded-lg text-xl relative">
            <Image
              className="absolute top-2 right-4 w-36 h-36 object-contain"
              src="/images/MEMESAT-1.png"
              alt="MEMESat-1 Patch"
              width={144}
              height={144}
            />
            <h2 className="text-5xl">MEMESat-1</h2><br />
            <h3 className="text-2xl">Mission for Education<br />and Multimedia Engagement<br />Satellite</h3>
            <p className="text-sm">
              The Mission for Education and Multimedia Engagement Satellite (MEMESat-1)
              is a non-profit funded 2U satellite designed for K-12 education and STEM outreach.
              This mission is funded by Let&apos;s Go to Space, a registered non-profit organization
              dedicated to educating students across the world on space topics and radio systems.
              MEMESat-1 aims to break down barriers to entry in the space industry and engage kids with
              STEM concepts through innovative means. MEMESat-1 connects with students across the world by allowing users to send a meme
              of their choice directly to the satellite.
            </p>
          </section>

          <section id="moci-section" className="max-w-2xl p-4 bg-gray-500/80 rounded-lg text-xl relative">
            <Image
              className="absolute top-2 right-4 w-36 h-36 object-contain"
              src="/images/MOCI_Patchv3.png"
              alt="MOCI Patch"
              width={144}
              height={144}
            />
            <h2 className="text-5xl">MOCI</h2><br />
            <h3 className="text-2xl">Multiview Onboard<br />Computational Imager</h3>
            <p className="text-sm">
              The MOCI mission shall
              acquire imagery of the Earth&apos;s surface from (Low Earth Orbit) LEO
              and perform near real time Structure from Motion (SfM) at a
              landscape scale using custom algorithms and off the shelf, high
              performance computational units. The MOCI mission will also
              identify and map coastal phenomena while training students in STEM related fields.
              Efficient data compression, feature detection, feature matching,
              and SfM processing techniques of space-based imagery will be
              performed on board the spacecraft as a proof-of-concept of high
              performance, on board processing capabilities. 3D models produced
              by the MOCI satellite will take the form of Digital Surface Models
              (DSM) as their end product for quick data downlink.
            </p>
          </section>
        </div>

        <div className="min-h-screen w-full flex items-end justify-center">
          <section id="thankyou-section" className="max-w-2xl p-4 bg-gray-500/80 rounded-lg flex flex-col items-center text-xl relative">
            <h2 className="text-3xl">Thank You!</h2>
            <p>We are continuing to break new ground in the Small Satellite Research Laboratory.
              If you are a student with an interest in spacecraft, a potential partner, or just want to learn more, please reach out to us! We are always looking for new collaborators and would love to hear from you.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}