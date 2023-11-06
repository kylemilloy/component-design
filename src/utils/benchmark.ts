export default function benchmark(name: string = '') {
  const start = performance.now()

  return () => {
    const end = performance.now()

    console.log(`${name ? name + ' ' : ''}Benchmark: ${end - start}ms`)
  }
}
