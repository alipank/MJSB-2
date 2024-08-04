import {
  Accordion,
  AccordionItem,
  Button,
  Card,
  CardBody,
  CardFooter,
  Chip,
  Divider,
  Image,
} from "@nextui-org/react";
import NextImage from "next/image";
import { alegreya, sourceSans } from "../fonts";
import { Children, ReactNode } from "react";

async function getData() {
  const res = await fetch(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRfksdbrKVE4LC_SBXQV6piq2T5TXZb-6-1kzTlLmn9Upsdz-EtABaX4T15X_Vz0zVrfwr9xPBxlc5V/pub?output=csv"
  );

  // if (!res.ok) {
  //   throw new Error("Failed to fetch data");
  // }

  // return new Promise<String>((resolve, reject) => {
  //   resolve(res.text());
  // });

  return res.text();
}

export default function Home() {
  // const data = await getData();
  return (
    <main className="bg-sky-100 overflow-hidden">
      <div className="w-full h-4/5 px-8 sm:px-16 2xl:px-32 lg:grid lg:grid-rows-1 lg:grid-cols-2 ">
        {/* <div className=" "> */}
        <div className="*:z-10  py-20 gap-1 md:gap-4   2xl:gap-8 xl:py-32 lg:pr-0 flex flex-col  justify-between">
          <h1
            className={`${alegreya.className} text-5xl sm:text-6xl 2xl:text-7xl  bg-gradient-to-t from-primary-800 to-primary-600 inline-block text-transparent bg-clip-text font-black text-primary-800 [text-shadow:0px_2px_5px_#0006]`}
          >
            Kamu Bisa loh.. Menjahit Tanpa Kantong Jebol
          </h1>
          <div className={`text-xl sm:text-2xl lg:text-3xl my-8 text-stone-800`}>
            <p className="mb-1 text-nowrap">
              Kamu ingin{" "}
              <span className="underline decoration-solid decoration-primary-700">
                Mesin Jahit berkualitas
              </span>?
            </p>
            <p className="mb-5">
              atau Mesin jahit anda rusak dan perlu segera di perbaiki?{" "}
            </p>
            <p>Segera hubungi kami !! buka setiap hari ;)</p>
          </div>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-5 xl:gap-8 2xl:gap-12">
            <Button
              className={`py-6 sm:py-7 md:py-8 max-w-64 text-medium sm:text-xl lg:text-2xl xl:col-span-2 text-amber-950 bg-gradient-to-tr from-amber-500 to-amber-300 border-amber-950 border-2 border-b-4  font-bold  box-border`}
            >
              <p>Hubungi Kami</p>
            </Button>
            {/* <span className="inline-block w-24"></svpan> */}
            <Button className="py-6 sm:py-7 md:py-8 max-w-64 text-medium sm:text-xl lg:text-2xl xl:col-span-2 text-amber-950 bg-transparent  border-amber-950 border-2 border-b-4 font-bold ">
              <p>Lihat-Lihat Mesin</p>
            </Button>
          </div>
        </div>


        <div className="absolute self-center opacity-20 lg:static lg:opacity-100 top-16">
          {/* <Divider orientation="vertical" className="absolute"></Divider> */}
          <Image
            src="/hero.png"
            removeWrapper
            className="w-4/5 lg:w-full xl:w-5/6 mx-auto my-12"
            // width="80%"
            alt=""
          />
        </div>
        {/* </div> */}
      </div>
      {/* bg-gradient-to-b from-sky-50 to-sky-100  */}
      <div className="relative z-10">
        <Card
          isBlurred
          className="md:hidden absolute -top-12 right-0 left-0 w-5/6 max-w-md bg-white/50 mb-16 mt-0 py-6 px-4 mx-auto border-2 border-amber-950"
        >
          {/* <img src="/hero.png" alt="" /> */}
          <div className="flex flex-row text-lg sm:text-xl font-bold place-items-center rounded-2xl ">
            <h2
              className={`${alegreya.className} text-right w-full flex-grow-[5]`}>
              800+ Mesin telah diperbaiki/terjual
            </h2>
            <Divider orientation="vertical" className="mx-2 h-12"></Divider>
            <h2 className={`${alegreya.className} w-full flex-grow-[5] `}>
              Berpengalaman Sejak{" "}
              <span className="bg-gradient-to-tr from-amber-600 to-amber-400 text-transparent bg-clip-text">
                2015
              </span>
            </h2>
          </div>
        </Card>
        <Card
          isBlurred
          className="hidden md:block absolute -top-12 right-0 left-0 bg-white/50 mb-16 mx-auto w-5/6 max-w-screen-md h-24 "
        >
          {/* <img src="/hero.png" alt="" /> */}
          <div className="absolute flex flex-row items-center text-center  px-4 justify-evenly border-2 border-amber-950 before:hidden before:bg-white/10 w-full h-full rounded-2xl ">
            <h2 className={`${alegreya.className} flex-grow-[3] font-bold text-2xl`}>
              Sejak{" "}
              <span className="bg-gradient-to-tr from-amber-600 to-amber-400 text-transparent bg-clip-text">
                2015
              </span>
            </h2>
            <Divider orientation="vertical" className="  bg-amber-950">
            </Divider>
            <h2 className={`${alegreya.className} flex-grow-[7] font-bold text-2xl`}>
              800+ Mesin telah diperbaiki/terjual
            </h2>
            <Divider orientation="vertical" className=" bg-amber-950"></Divider>
            <h2
              className={`${alegreya.className} flex-grow-[3] font-black text-2xl bg-gradient-to-tr from-primary-600 to-primary-400 text-transparent bg-clip-text`}
            >
              MJSB
            </h2>
          </div>
        </Card>
      </div>
      <div className="relative text-center bg-sky-50 pt-20 pb-12">
        {/* background bulat bulat start*/}
        <div className="absolute  w-36 h-36 left-4 top-36 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400"></div>
        <div className="absolute w-36 h-36 right-4 bottom-10 rounded-full bg-gradient-to-tl from-primary-600 to-primary-400"></div>

        {/* background bulat bulat end */}
        <h2
          className={`${alegreya.className} relative mb-2 text-center text-3xl font-black text-amber-950`}
        >
          Pengalaman Pelanggan
        </h2>
        {/* <span className="inline-block h-6 w-full"></span> */}
        <Chip
          variant="shadow"
          className="text-amber-950 bg-gradient-to-tr from-amber-500 to-amber-300 border-amber-950 border-2 font-bold"
        >
          Ulasan Google Maps
        </Chip>
        <div className="flex flex-row flex-wrap justify-center gap-4 mx-8  mt-8">
          <ReviewSection
            text="Recommended untuk yang lagi cari mesin jahit second dengan
                kualitas mulus, dapet harga yang cocok. penjual nya ramah,
                ngerti merk dan perbandingan mesin. Insyaallah beli disini
                amanah diajarin sampai bisa, bisa dikontak buat service pula."
            name="Rumah Jahit by insannuur" />
          <ReviewSection
            text="Rekomend buat yg nyari mesin jahit seken.. bisa service jg,
                ownernya ramah banget. Mesin jahit berbagai jenis ada tinggal
                menyesuaikan budget. Dan dipastikan siap pakai."
            name="Septi Pertiwi" />
          <ReviewSection
            text="Kang servis mesin portable/mesin industri/mesin jadul dan
                penjual mesin paling enaken,enak diajak ngobrol,enak ditnya soal
                mesin,dikasih saran,dikasih tips,bisa datang kerumah"
            name="Ummu RayyaS" />
        </div>
      </div>
      <div className="text-center relative py-12">
        {/* background accent start*/}
        <div className="absolute w-24 h-64 left-4 top-36 rounded-2xl bg-gradient-to-tr from-primary-600 to-primary-400 -z-1"></div>
        <div className="absolute w-24 h-64 right-4 bottom-10 rounded-2xl  bg-gradient-to-tl from-amber-600 to-amber-400"></div>

        {/* background accent end */}
        <QnaSection
          topic="Kondisi Mesin"
          question="Apakah Ada Menjual Mesin Jahit Baru ?"
          answer="Kami berfokus untuk menjual mesin jahit bekas yang sudah kami
              periksa dengan teliti. Setiap mesin yang kami jual sudah
              dipastikan berfungsi dengan baik dan siap dipakai, jadi Anda bisa
              mendapatkan mesin jahit berkualitas (like new) dengan harga yang
              lebih terjangkau."/>
        <Divider className="w-1/2 mx-auto my-8"></Divider>
        <QnaSection
          topic="Garansi Barang"
          question="Bagaimana jika barang yang dibeli rusak ?"
          answer={<div>Kami menjamin semua mesin jahit yang kami jual akan berfungsi
            dengan baik. Kami juga memberikan <span className="font-bold">garansi selama 30 hari</span> untuk
            semua barang dan perbaikan yang kami lakukan. Jika ada masalah
            selama masa garansi, kami akan memperbaikinya secara gratis. Jadi,
            anda tidak perlu khawatir.</div>} />
        <Divider className="w-1/2 mx-auto my-8"></Divider>

        {/* <div> */}
        {/* <p className="text-slate-700">Kondisi Mesin</p>
          <h3 className={`${alegreya.className} text-3xl font-bold`}>
            Apakah Ada Menjual Mesin Jahit Baru ?
          </h3>
          <Card
            className="w-5/6 mx-auto mt-8 py-2 px-4 bg-white/75 border-2  border-primary-900"
            isBlurred
          >
            <CardBody className="text-lg">
              Kami berfokus untuk menjual mesin jahit bekas yang sudah kami
              periksa dengan teliti. Setiap mesin yang kami jual sudah
              dipastikan berfungsi dengan baik dan siap dipakai, jadi Anda bisa
              mendapatkan mesin jahit berkualitas (like new) dengan harga yang
              lebih terjangkau.
            </CardBody>
          </Card>
        </div>
        <Divider className="w-1/2 mx-auto my-8"></Divider>
        <div>
          <p className="text-slate-700">Garansi Barang</p>
          <h3 className={`${alegreya.className} text-3xl font-bold`}>
            Bagaimana jika mesin yang dibeli rusak ?
          </h3>
          <Card
            // isBlurred
            className="w-5/6 mx-auto mt-8 py-2 px-4 bg-white/75 border-2 border-amber-950"
          >
            <CardBody className="text-lg">
              Kami menjamin semua mesin jahit yang kami jual akan berfungsi
              dengan baik. Kami juga memberikan garansi selama 30 hari untuk
              semua barang dan perbaikan yang kami lakukan. Jika ada masalah
              selama masa garansi, kami akan memperbaikinya secara gratis. Jadi,
              anda tidak perlu khawatir.
            </CardBody>
          </Card>*/}
        {/* </div>  */}
      </div>
      <div className="bg-sky-50 py-16">
        <h2 className={`${alegreya.className} mb-4 text-center text-5xl font-black`}>
          Kunjungi kami
        </h2>
        <div className="px-8">
          <div className="w-5/6 mx-auto mb-4">
            <Button
              className=" text-slate-50 w-full mb-4 flex justify-start bg-gradient-to-tr from-[#25D366] to-green-400 text-xl py-8 px-4 border-amber-950 border-2 border-b-4 font-bold"
              startContent={
                <Image
                  as={NextImage}
                  src="/wa_white.svg"
                  width={40}
                  height={40}
                />
              }
            >
              0812-6644-2133
            </Button>
            <Button
              className=" text-slate-50 w-full mb-4 flex justify-start bg-gradient-to-tr from-[#1877F2] to-sky-500 text-xl py-8 px-4 border-amber-950 border-2 border-b-4 font-bold"
              startContent={
                <Image
                  as={NextImage}
                  src="/fb_white.png"
                  width={40}
                  height={40}
                />
              }
            >
              MJSB
            </Button>
            <Button
              className=" text-slate-50 w-full flex justify-start bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-xl py-8 px-4 border-amber-950 border-2 border-b-4 font-bold"
              startContent={
                <Image
                  as={NextImage}
                  src="/ig_white.svg"
                  width={40}
                  height={40}
                />
              }
            >
              MJSB
            </Button>
            <p className="text-right mt-4">
              Jl. Rindang Garden Batu Aji No.15 blok C2, Buliang, Kec. Batu Aji,
              Kota Batam, Kepulauan Riau 29424
            </p>
          </div>

          <div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.141549138857!2d103.97474881136158!3d1.0553296624455868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d98daa3c1a2ab3%3A0xd92241c19d311839!2smesin%20jahit%20seken%20batam!5e0!3m2!1sid!2sid!4v1721545975577!5m2!1sid!2sid"
              className="w-full rounded-2xl aspect-square border-4 border-amber-950"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </main>
  );
}

interface ReviewSectionProps {
  text: string,
  name: string
}

function ReviewSection({ text, name }: ReviewSectionProps) {
  return (
    <Card
      className="bg-white/50 max-w-96 sm:w-5/12 py-2 px-4 border-2 border-b-4 border-amber-950 h-60 flex flex-col justify-around"
      isBlurred
    >
      <CardBody>
        <p>
          {text}
        </p>
      </CardBody>
      <Divider></Divider>
      <CardFooter className="font-bold">
        <p>{name}</p>
      </CardFooter>
    </Card>
  )
}

interface QnaSectionProps {
  topic: string,
  question: string,
  answer: ReactNode
}

function QnaSection({ topic, question, answer }: QnaSectionProps) {
  return (
    <div>
      <p className="text-slate-700">{topic}</p>
      <h3 className={`${alegreya.className} text-3xl font-bold w-5/6 mx-auto`}>
        {question}
      </h3>
      <Card
        className="w-5/6 mx-auto mt-8 py-2 px-4 bg-white/75 border-2  border-primary-900"
        isBlurred
      >
        <CardBody className="text-lg">
          {answer}
        </CardBody>
      </Card>
    </div>
  )
}
